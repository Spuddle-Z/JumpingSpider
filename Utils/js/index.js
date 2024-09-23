export const HelloWorld = ({ name = 'World' }) => {
    return (<div>Hello, {name}!</div>);
};


// 生成周期性任务
async function setRepeatTasks() {
	// 读取原文件内容
	const file = app.vault.getAbstractFileByPath("Utils/task-calendar/TaskList.md");
	var content = await app.vault.read(file);

	// 生成新任务
	recurrence = tasks.filter(t => t.repeat != "None" && (t.completed || moment(t.due).isBefore(tToday) || moment(t.due).isSame(tToday)));
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
};