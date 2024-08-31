---
<%*
// 获取输入的截止日期
async function get_due() {
	let due, isValid;
	due = await tp.system.prompt('截止日期 格式为"YYYYMMDD" ');
	isValid = moment(due, "YYYYMMDD", true).isValid();
	if (isValid) {
		due = moment(due, "YYYYMMDD").format("YYYY-MM-DD");
		return due;
	}
	do {
		due = await tp.system.prompt('重新输入格式为"YYYYMMDD"的有效日期');
		isValid = moment(due, "YYYYMMDD", true).isValid();
	} while (due != null && !isValid);
	moment(due, "YYYYMMDD").format("YYYY-MM-DD");
	return due;
}

// 输入任务关键信息
const text = await tp.system.prompt("What's Up?");
const due = await get_due();
const priority = await tp.system.suggester(["闲白儿", "正事儿", "急茬儿"], ["Low", "Normal", "High"], true, "优先级");

// 将任务插入至相应的文件中
const file = tp.file.find_tfile("Utils/task-calendar/" + priority + ".md");
let content = await app.vault.read(file);
const task = "- [ ] [text:: " + text + "] [due:: " + due + "] [priority:: " + priority + "]\n";
content += task;
await app.vault.modify(file, content);
return null;
-%>
---
