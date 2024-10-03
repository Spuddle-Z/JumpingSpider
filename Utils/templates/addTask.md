---
<%*
// 生成一个Obsidian的块ID
async function generateBlockRefId() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '^';
	const charactersLength = characters.length;
	for (let i = 0; i < 8; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// 获取输入的截止日期
async function get_due() {
	let due, isValid;
	due = await tp.system.prompt('截止日期 格式为"YYYYMMDD"；无截止日期直接Enter');
	if (due == "") { return "None"; }
	isValid = moment(due, "YYYYMMDD", true).isValid();
	if (isValid) {
		due = moment(due, "YYYYMMDD").format("YYYY-MM-DD");
		return due;
	}
	do {
		due = await tp.system.prompt('重新输入格式为"YYYYMMDD"的有效日期；无截止日期直接Enter');
		isValid = moment(due, "YYYYMMDD", true).isValid();
		if (due == "") { return "None"; }
	} while (!isValid);
	moment(due, "YYYYMMDD").format("YYYY-MM-DD");
	return due;
}

// 输入任务关键信息
const id = await generateBlockRefId();
const text = await tp.system.prompt("What's Up?");
const priority = await tp.system.suggester(["闲白儿", "正事儿", "急茬儿"], ["Low", "Normal", "High"], true, "优先级");
const due = await get_due();
const repeat = await tp.system.suggester(["不重复", "每天", "每周", "每月"], ["None", "Daily", "Weekly", "Monthly"], true, "重复周期")

// 将任务插入至TaskList.md中
const file = tp.file.find_tfile("Utils/task-calendar/TaskList.md");
let content = await app.vault.read(file);
const task = "- [ ] [id:: " + id + "] [content:: " + text + "] [due:: " + due + "] [repeat:: " + repeat + "] [priority:: " + priority + "]\n";
content += task;
await app.vault.modify(file, content);
return null;
-%>
---
