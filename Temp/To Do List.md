```dataviewjs
// 利用正则表达式，将任务文本中的元数据提取并存储成属性
function getMeta(tasks) {
	// 遍历目标地址下捕获的所有任务
    for (i = 0; i < tasks.length; i++) {
		var taskText = tasks[i].text;
		
		// 通过正则表达式匹配任务文本中的元数据
		var textMatch = taskText.match(/\[content:: (.*?)\]/);
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
async function addRepeatTasks(recurrence) {
	// 读取原文件内容
	const file = app.vault.getAbstractFileByPath("Utils/task-calendar/TaskList.md");
	var content = await app.vault.read(file);

	// 生成新任务
	var newTasks = "";
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
		newTasks += "- [ ] [id:: " + genId() + "] [content:: " + recurrence[i].text + "] [due:: " + newDue + "] [repeat:: " + repeat + "] [priority:: " + recurrence[i].priority + "]\n";

		// 修改原任务周期性为None
		const idEscaped = recurrence[i].id.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		const regex = new RegExp(`^.*?\\[id:: ${idEscaped}\\].*?\\n`, 'gm');
		const cpl = recurrence[i].completed ? "x" : " ";
		content = content.replace(regex, "- [" + cpl + "] [id:: " + recurrence[i].id + "] [content:: " + recurrence[i].text + "] [due:: " + due + "] [repeat:: None] [priority:: " + recurrence[i].priority + "]\n");
	}
	// 修改原文件
	app.vault.modify(file, content + newTasks);
}


// 反复刷新任务列表至列表不再变化
async function refreshTasks() {
	const tToday = moment().format("YYYY-MM-DD");
	while (true) {
		var tasks = dv.pages('"Utils/task-calendar"').file.tasks;
		tasks = getMeta(tasks);
		var recurrence = tasks.filter(t => t.repeat != "None" && (t.completed || moment(t.due).isBefore(tToday) || moment(t.due).isSame(tToday)));
		if (recurrence.length == 0) { return; }
		await addRepeatTasks(recurrence);
		await new Promise(r => setTimeout(r, 100));
	}
}
refreshTasks();
```

## Today
```dataview
TASK
FROM "Utils/task-calendar"
WHERE !completed AND due <= date(today)
```
```dataviewjs
const tToday = moment().format("YYYY-MM-DD");
var tasks = dv.pages('"Utils/task-calendar/TaskList"').file.tasks;
tasks = tasks.where(t => !t.completed && (moment(t.due.valueOf()).isBefore(tToday) || moment(t.due.valueOf()).isSame(tToday)));

// 定义可见部分
for (let t of tasks) {
	const tDue = moment(t.due.valueOf());
	t.visual = "";
	if (tDue.isBefore(tToday)) {
		t.visual += tDue.format("YYYY-MM-DD") + ' ';
		t.priority = 'Overdue';
		t.visual += "<span style='color: #ffcb6b;'>" + t.content + "</span>";
	} else if (t.priority == 'Low') {
		t.visual += "<span style='color: #73bbb2;'>" + t.content + "</span>";
	} else if (t.priority == 'Normal') {
		t.visual += "<span style='color: #97d8f8;'>" + t.content + "</span>";
	} else if (t.priority == 'High') {
		t.visual += "<span style='color: #d04255;'>" + t.content + "</span>";
	}
}

const order = ['Low', 'Normal', 'Overdue', 'High'];
tasks = tasks.sort((a, b) => order.indexOf(b.priority) - order.indexOf(a.priority))

dv.header(2, "Today")
dv.taskList(tasks, false);
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
