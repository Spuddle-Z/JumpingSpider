```emjs
const tToday = moment().format("YYYY-MM-DD");
// 读取原文件内容
const file = app.vault.getAbstractFileByPath("Utils/task-calendar/TaskList.md");
var content = app.vault.read(file);
console.log(content)
```

```emjs
(async () => {
	const moment = require('moment');
	const tToday = moment().format("YYYY-MM-DD");

	// 捕获目标地址下的所有任务
	function getPages() {
		// Get, Set, Eval Pages
		if (pages == "") {
			var tasks = dv.pages().file.tasks
		} else {
			if (pages.startsWith("dv.pages")) { var tasks = eval(pages) }
			else { var tasks = dv.pages(pages).file.tasks }
		};
		return tasks;
	};
	
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
	};
	
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
	
	// 生成新的周期任务
	async function setRepeatTasks() {
		// Read the original file content
		const file = app.vault.getAbstractFileByPath("Utils/task-calendar/TaskList.md");
		var content = await app.vault.read(file);

		// Filter tasks that need recurrence
		const recurrence = tasks.filter(t =>
		t.repeat != "None" &&
		(t.completed || moment(t.due).isBefore(tToday) || moment(t.due).isSame(tToday))
		);

		var newTasks = "";
		for (let i = 0; i < recurrence.length; i++) {
		const repeat = recurrence[i].repeat;
		const due = recurrence[i].due;
		let newDue;

		// Generate new due date based on repeat interval
		switch (repeat) {
			case "Daily":
			newDue = moment(due).add(1, "days").format("YYYY-MM-DD");
			break;
			case "Weekly":
			newDue = moment(due).add(1, "weeks").format("YYYY-MM-DD");
			break;
			case "Monthly":
			newDue = moment(due).add(1, "months").format("YYYY-MM-DD");
			break;
		}

		newTasks += `- [ ] [id:: ${genId()}] [text:: ${recurrence[i].text}] [due:: ${newDue}] [repeat:: ${repeat}] [priority:: ${recurrence[i].priority}]\n`;

		// Modify the original task's repeat to "None"
		const idEscaped = recurrence[i].id.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		const regex = new RegExp(`^.*?\\[id:: ${idEscaped}\\].*?\\n`, 'gm');
		const match = content.match(regex);

		if (match) {
			dv.paragraph("Match:");
		} else {
			dv.paragraph("No Match");
		}

		const cpl = recurrence[i].completed ? "x" : " ";
		content = content.replace(regex, `- [${cpl}] [id:: ${recurrence[i].id}] [text:: ${recurrence[i].text}] [due:: ${due}] [repeat:: None] [priority:: ${recurrence[i].priority}]\n`);
		}

		// Modify the original file
		await app.vault.modify(file, content + newTasks);
	}

	// Run the function
	tasks = getPages();
	getMeta(tasks);	// 将任务文本中的元数据提取并存储成属性
	await setRepeatTasks();
})();
```