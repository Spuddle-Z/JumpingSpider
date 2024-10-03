```dataviewjs
// 利用正则表达式，将任务文本中的元数据提取并存储成属性
function getMeta(tasks) {
	// 遍历目标地址下捕获的所有任务
    for (i = 0; i < tasks.length; i++) {
		var taskText = tasks[i].text;
		
		// 通过正则表达式匹配任务文本中的元数据
		var textMatch = taskText.match(/\[text:: (.*?)\]/);
		if (textMatch) {
			tasks[i].text = textMatch[1];
			taskText = taskText.replace(textMatch[0], "");
		}
		
		var priorityMatch = taskText.match(/\[priority:: (Low|Normal|High)\]/);
		if (priorityMatch) {
			tasks[i].priority = priorityMatch[1];
			taskText = taskText.replace(priorityMatch[0], "");
		}
		
		var dueMatch = taskText.match(/\[due:: (\d{4}-\d{2}-\d{2})\]/);
		if (dueMatch) {
			tasks[i].due = dueMatch[1];
			taskText = taskText.replace(dueMatch[0], "");
		}
		
        var repeatMatch = taskText.match(/\[repeat:: (None|Daily|Weekly|Monthly)\]/);
        if (repeatMatch) {
			tasks[i].repeat = repeatMatch[1];
            taskText = taskText.replace(repeatMatch[0], "");
        }
    }
	return tasks;
}


// 生成随机的8位任务ID
function genId() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '^';
	const charactersLength = characters.length;
	for (let i = 0; i < 8; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}


// 生成周期性任务
async function setRepeatTasks(tasks) {
	// 读取原文件内容
	const file = app.vault.getAbstractFileByPath("Utils/task-calendar/TaskList.md");
	var content = await app.vault.read(file);

	// 生成新任务
	const tToday = moment().format("YYYY-MM-DD");
	var recurrence = tasks.filter(t => t.repeat != "None" && (t.completed || moment(t.due).isBefore(tToday) || moment(t.due).isSame(tToday)));
	var newTasks = "";
	dv.paragraph(`周期性任务数量：${recurrence.length}`);
	for (i = 0; i < recurrence.length; i++) {
		var repeat = recurrence[i].repeat;
		var due = recurrence[i].due;
		// 生成新日期
		switch (repeat) {
			case "Daily":
				var newDue = moment(due).add(1, "days").format("YYYY-MM-DD");
				break;
			case "Weekly":
				var newDue = moment(due).add(1, "weeks").format("YYYY-MM-DD");
				break;
			case "Monthly":
				var newDue = moment(due).add(1, "months").format("YYYY-MM-DD");
				break;
		}
		newTasks += "- [ ] [id:: " + genId() + "] [text:: " + recurrence[i].text + "] [due:: " + newDue + "] [repeat:: " + repeat + "] [priority:: " + recurrence[i].priority + "]\n";

		// 修改原任务周期性为None
		const idEscaped = recurrence[i].id.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		const regex = new RegExp(`^.*?\\[id:: ${idEscaped}\\].*?\\n`, 'gm');
		const match = content.match(regex);
		if (match) {
			dv.paragraph("Match:");
		} else {
			dv.paragraph("No Match");
		}
		const cpl = recurrence[i].completed ? "x" : " ";
		content = content.replace(regex, "- [" + cpl + "] [id:: " + recurrence[i].id + "] [text:: " + recurrence[i].text + "] [due:: " + due + "] [repeat:: None] [priority:: " + recurrence[i].priority + "]\n");
	}
	// 修改原文件
	app.vault.modify(file, content + newTasks);
    dv.paragraph(`最近一次刷新时间：${moment().format("YYYY-MM-DD HH:mm:ss")}`);
}


async function refresh() {
	var tasks = dv.pages('"Utils/task-calendar"').file.tasks;
	tasks = getMeta(tasks);
	await setRepeatTasks(tasks);
}

setInterval(refresh, 60000); // 每一分钟刷新一次
```

## Daily
```dataview
TASK
FROM "Utils/task-calendar"
WHERE !completed AND due <= date(today)
```

## No Deadline
```dataview
TASK
FROM "Utils/task-calendar"
WHERE !completed AND due = "None"
```

## Done
```dataview
TASK
FROM "Utils/task-calendar"
WHERE completed
```
