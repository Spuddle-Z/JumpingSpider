# Data Description



## Static Information



### Traffic Signal Information



#### `traffic_signal`

| name          | Key         | type   | comment |
| ------------- | ----------- | ------ | ------- |
| **signal_id** | Primary Key | STRING |         |
| signal_name   |             | STRING |         |



Code

```sql
CREATE TABLE traffic_signal AS
SELECT signal_id, signal_name
FROM signal;
```



### Traffic Camera Information

#### `traffic_camera`

| name            | type   | Key         | comment                                                      |
| --------------- | ------ | ----------- | ------------------------------------------------------------ |
| **camera_id**   | STRING | primary key |                                                              |
| camera_name     | STRING |             |                                                              |
| camera_location | STRING |             | values: `road_mid`，`intersection_head`，`intersection_tail` |

Code

```sql
CREATE TABLE traffic_camera AS
SELECT camera_id, camera_name, camera_location
FROM device_camera;
```



### Road Information

#### `road_intersection`

| name                | KEY         | type   | comment                       |
| ------------------- | ----------- | ------ | ----------------------------- |
| **intersection_id** | Primary Key | BIGINT |                               |
| intersection_osm_id |             | STRING |                               |
| intersection_name   |             | STRING |                               |
| intersection_type   |             | STRING | values: `signal`, `no signal` |

#### `road_link`

| name                         | Key                                      | type   | comment                                                      |
| ---------------------------- | ---------------------------------------- | ------ | ------------------------------------------------------------ |
| **link_id**                  | Primary Key                              | STRING |                                                              |
| *link_start_intersection_id* | Foreign Key (table: `road_intersection`) | BIGINT |                                                              |
| *link_end_intersection_id*   | Foreign Key (table: `road_intersection`) | BIGINT |                                                              |
| link_osm_id                  |                                          | STRING |                                                              |
| link_name                    |                                          | STRING |                                                              |
| link_level                   |                                          | STRING | levels defined by OSM: `motorway`, `motorway_link`, `primary`, `secondary`, etc.. |
| link_length                  |                                          | BIGINT | length in meters                                             |
| lanes                        |                                          | BIGINT | # of lanes                                                   |

#### `road_link_lane`

| name             | Key                              | type   | comment                                |
| ---------------- | -------------------------------- | ------ | -------------------------------------- |
| **link_lane_id** | Primary key                      | STRING |                                        |
| link_id          | Foreign Key (table: `road_link`) | STRING |                                        |
| link_lane_number |                                  | BIGINT |                                        |
| link_lane_turn   |                                  | STRING | `left`, `left/through`, `through`, etc |





Code:

```sql
CREATE TABLE road_intersection AS
SELECT intersection_id, intersection_osm_id, intersection_name, intersection_type
FROM roadnet_intersection;
```

```sql
CREATE TABLE road_link AS
SELECT link_id, link_start_intersection_id, link_end_intersection_id, link_osm_id, link_name, link_level, link_length, lanes
FROM roadnet_link;
```

```sql
CREATE TABLE road_link_lane AS
SELECT link_lane_id, link_id, link_lane_number, link_lane_turn
FROM roadnet_link_lane;
```





### Mapping Signal to Road



#### `mapping_signal_to_road`



| name               | Key                                                | type   | comment |
| ------------------ | -------------------------------------------------- | ------ | ------- |
| **signal_id**      | Primary key, Foreign Key (table: `traffic_signal`) | STRING |         |
| **signal_channel** | Primary key                                        | INT    |         |
| **link_lane_id**   | Primary key, Foreign Key (table: `road_link_lane`) | STRING |         |

**Note**:  `link_lane_id`  and (`signal_id`, `signal_channel`) is N:N mapping. It should be 1:N mapping because one `link_lane_id` should only correspond to one  (`signal_id`, `signal_channel`). But in real case, there could be a lane with both left-turn-only signal and through-only signal. Such a case should be elimated in the real world because a left-turn car could block through cars on the same link-lane when the left-turn is red and through is green. 



Code:

```sql
CREATE TABLE mapping_signal_to_road AS
SELECT
    a.signal_id,
    CAST(a.signal_channel AS INT),
    b.link_lane_id
FROM
    mapping_camera_lane_to_signal_channel a
JOIN
    mapping_camera_to_road b
ON
    a.camera_id = b.camera_id
    AND a.camera_lane_number = b.camera_lane_number;
```



**Note2**: Ideally, this table should be independently labelled. Currently it is generated from join of camera lane and signal channel. We observed inconsistency, discussed later.

**Note3**: For changable lanes, this table should be changed dynamically as well. 



![signal-channels](img/signal-channels.png)



### Mapping Camera to Road



#### `mapping_camera_to_road`

| name                   | Key                                                | type   | comment |
| ---------------------- | -------------------------------------------------- | ------ | ------- |
| **camera_id**          | Primary key, Foreign Key (table: `traffic_camera`) | STRING |         |
| **camera_lane_number** | Primary key                                        | INT    |         |
| **link_lane_id**       | Primary key, Foreign Key (table: `road_link_lane`) | STRING |         |

**Note**:  `link_lane_id` and (`camera_id`, `camera_lane_number`) is a 1:N mapping because one link_lane could have multiple cameras installed on it.



Code:

```sql
CREATE TABLE mapping_camera_to_road AS
SELECT camera_id, CAST(camera_lane_number AS INT), link_lane_id
FROM mapping_camera_lane_to_link_lane;
```



### JOIN Camera and Signal



#### `join_camera_and_signal`

| name                   | Key                                                | type   | comment |
| ---------------------- | -------------------------------------------------- | ------ | ------- |
| **camera_id**          | Primary key, Foreign Key (table: `traffic_camera`) | STRING |         |
| **camera_lane_number** | Primary key                                        | INT    |         |
| **signal_id**          | Primary key, Foreign Key (table: `road_link_lane`) | STRING |         |
| **signal_channel**     | Primary key                                        | INT    |         |
| **link_land_id**       |                                                    | STRING |         |



get data from `mapping_signal_to_road` and `mapping_camera_to_road`



```sql
CREATE TABLE join_camera_and_signal AS
SELECT DISTINCT
    a.camera_id,
    a.camera_lane_number,
    b.signal_id,
    b.signal_channel,
    a.link_lane_id
FROM
    mapping_camera_to_road a
JOIN
    mapping_signal_to_road b
ON
    a.link_lane_id = b.link_lane_id;
    
    
SELECT a.*
FROM join_camera_and_signal a
LEFT JOIN mapping_camera_lane_to_signal_channel b ON
    a.camera_id = b.camera_id
    AND a.camera_lane_number = b.camera_lane_number
    AND a.signal_id = b.signal_id
    AND a.signal_channel = b.signal_channel
WHERE b.camera_id IS NULL;

```



**Note**: ideally, we should get the data by joining `mapping_signal_to_road` and `mapping_camera_to_road`. but currently since `mapping_signal_to_road` is generated from derived join table, there is some incosnsitency in the current data. See example below.

```bash
select * from mapping_signal_to_road
where link_lane_id = '70-250_3';
```

|camera_id|camera_lane_number|signal_id|signal_channel|link_lane_id|
|---|---|---|---|---|
|nTYXq9ulA1DPBC234CMCJK|2|320200003116|6|70-250_3|
|nTYXq9ulA1DPBC232R2F4U|2|320200003116|5|70-250_3|
|nTYXq9ulA1DPBC232R2F4U|2|320200003116|6|70-250_3|

-- original table missing the mapping between CJK-2 to 116-5
select * from mapping_camera_lane_to_signal_channel
where camera_id = 'nTYXq9ulA1DPBC234CMCJK' and camera_lane_number = 2;

+------------+------------+----------------+--------------------+------------+------------+
| camera_id  | signal_id  | signal_channel | camera_lane_number | created_at | updated_at | 
+------------+------------+----------------+--------------------+------------+------------+
| nTYXq9ulA1DPBC234CMCJK | 320200003116 | 6    | 2   | 2023年10月19日 下午2:54:53 | 2023年10月19日 下午2:54:53 | 
+------------+------------+----------------+--------------------+------------+------------+

select * from mapping_camera_lane_to_signal_channel
where camera_id = 'nTYXq9ulA1DPBC232R2F4U' and camera_lane_number = 2;
+------------+------------+----------------+--------------------+------------+------------+
| camera_id  | signal_id  | signal_channel | camera_lane_number | created_at | updated_at | 
+------------+------------+----------------+--------------------+------------+------------+
| nTYXq9ulA1DPBC232R2F4U | 320200003116 | 5 | 2      | 2023年10月19日 下午2:54:53 | 2023年10月19日 下午2:54:53 | 
| nTYXq9ulA1DPBC232R2F4U | 320200003116 | 6 | 2      | 2023年10月19日 下午2:54:53 | 2023年10月19日 下午2:54:53 | 
+------------+------------+----------------+--------------------+------------+------------+

This means that both CJK-2 and F4U-2 are associated with signal 116-5 and 116-6. But we lack a record CJK-2 correspondings to signal 116-5 in the original table `mapping_camera_lane_to_signal_channel`.



## Dynamic Data



### Traffic Camera Data



#### `passing_vehicles`

| name                   | Key                                   | type     | comment |
| ---------------------- | ------------------------------------- | -------- | ------- |
| **pass_id**            | Primary key                           | STRING   |         |
| **camera_id**          | Foreign Key (table: `traffic_camera`) | STRING   |         |
| **camera_lane_number** |                                       | INT      |         |
| **pass_timestamp**     |                                       | DATETIME |         |
| **veh_id**             |                                       | STRING   |         |



Code:

```sql
-- change the string datetime to datetime and remvoe the duplicates with the same tpid
CREATE TABLE passing_vehicles AS
SELECT DISTINCT
    tpid AS pass_id, 
    channelid AS device_id, 
    CAST(cdbh AS INT) AS camera_lane_number, 
    from_unixtime(CAST(CAST(jgsj AS BIGINT) / 1000 AS BIGINT)) AS pass_timestamp,
    hphm AS veh_id
FROM 
    history_su_dahua_from_524; 
```





### Traffic Signal Data



#### `traffic_signal_data`

| name                 | Key  | type     | comment |
| -------------------- | ---- | -------- | ------- |
| **signal_id**        |      | STRING   |         |
| **stage_start_time** |      | DATETIME |         |
| **stage_end_time**   |      | DATETIME |         |
| **signal_channel**   |      | INT      |         |



Code:

```sql
CREATE TABLE traffic_signal_data AS
SELECT signal_id as signal_id, 
  to_date(history_signal_data.stage_start_time, 'yyyy/mm/dd hh:mi:ss') as stage_start_time,
  to_date(history_signal_data.stage_end_time, 'yyyy/mm/dd hh:mi:ss') as stage_end_time,
  CAST(signal_channel AS INT) as signal_channel
FROM history_signal_data;
```





## One-day sample



Code:

```sql
CREATE TABLE passing_vehicles_20230801 AS
SELECT *
FROM passing_vehicles
WHERE pass_timestamp >= '2023-08-01 00:00:00' AND pass_timestamp < '2023-08-02 00:00:00';

CREATE TABLE traffic_signal_data_20230801 AS
SELECT *
FROM traffic_signal_data
WHERE stage_start_time >= '2023-08-01 00:00:00' AND stage_start_time < '2023-08-02 00:00:00' AND stage_end_time >= '2023-08-01 00:00:00' AND stage_end_time < '2023-08-02 00:00:00';
```



Download data to ECS:

```sql
tunnel download -h true traffic_signal traffic_signal.csv;
tunnel download -h true traffic_camera traffic_camera.csv;
tunnel download -h true road_intersection road_intersection.csv;
tunnel download -h true road_link road_link.csv;
tunnel download -h true road_link_lane road_link_lane.csv;
tunnel download -h true mapping_signal_to_road mapping_signal_to_road.csv;
tunnel download -h true mapping_camera_to_road mapping_camera_to_road.csv;
tunnel download -h true join_camera_and_signal join_camera_and_signal.csv;
tunnel download -h true passing_vehicles_20230801 passing_vehicles_20230801.csv;
tunnel download -h true traffic_signal_data_20230801 traffic_signal_data_20230801.csv;
```



Upload data from ECS to OSS:

```bash
ossutil cp -r /root/wuxi-city-brain/data/wuxi-traffic-data-20230801 oss://jessie/wuxi-traffic-data-20230801
```



Check data on OSS

```bash
ossutil ls oss://jessie/
```



Set the files as public

```bash
ossutil set-acl --recursive oss://jessie/wuxi-traffic-data-20230801 public-read
```



To get these files

```bash
ossutil cp -r oss://jessie/wuxi-traffic-data-20230801 /YOUR/LOCAL/PATH/ --endpoint http://oss-cn-jswx-xuelang-d01-a.ops.cloud.wuxi-yqgcy.cn/
```

