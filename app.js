const reportDateInput = document.querySelector("#reportDate");
const messengerInput = document.querySelector("#messengerInput");
const jiraInput = document.querySelector("#jiraInput");
const reportTitle = document.querySelector("#reportTitle");
const summaryTableBody = document.querySelector("#summaryTableBody");
const reportBody = document.querySelector("#reportBody");
const generatedAt = document.querySelector("#generatedAt");
const loadSampleBtn = document.querySelector("#loadSampleBtn");
const localSampleReportBtn = document.querySelector("#localSampleReportBtn");
const aiReportBtn = document.querySelector("#aiReportBtn");
const copyReportBtn = document.querySelector("#copyReportBtn");
const downloadReportBtn = document.querySelector("#downloadReportBtn");
const resetBtn = document.querySelector("#resetBtn");
const apiKeyInput = document.querySelector("#apiKeyInput");
const saveApiKeyBtn = document.querySelector("#saveApiKeyBtn");
const deleteApiKeyBtn = document.querySelector("#deleteApiKeyBtn");
const apiKeyStatus = document.querySelector("#apiKeyStatus");
const toast = document.querySelector("#toast");

const apiKeyStorageName = "securex_api_key";
const OPENAI_RESPONSES_ENDPOINT = "https://api.openai.com/v1/responses";
const MODEL_NAME = "gpt-4o-mini";
const initialReportMessage = "로컬 샘플 보고서 생성 버튼 또는 AI 보고서 생성 버튼을 누르면 이 영역에 일일 업무보고서 초안이 표시됩니다.";
const emptySummaryMessage = "보고서를 생성하면 주요 업무가 표로 정리됩니다.";

const sampleFiles = {
  messenger: "messenger_chat_sample.txt",
  jira: "jira_task_sample.csv"
};

const sampleData = {
  messenger: `# messenger_chat_sample.txt
# 용도: 모듈3 일일 업무보고서 자동 생성기 실습용 메신저 대화 샘플
# 주의: 모든 내용은 교육용 가상 데이터입니다. 실제 고객명, 계정, IP, 내부 URL, 장애 로그 원문은 포함하지 않았습니다.

============================================================
[SecureX 기술지원팀 메신저 대화 샘플]
일자: 2026-05-27
채널: #securex-support-daily
============================================================

09:05 박민준(기술지원)
어제 접수된 NAC 인증 실패 건 확인했습니다. 고객사 A 본사 일부 사용자에게만 발생했고, CWP 화면이 반복 표시된다고 합니다. 사용자 그룹 정책 변경 이력이 있어서 정책 매핑부터 확인하겠습니다.

09:12 이서연(보안분석)
EDR 위협 탐지 알림 건도 확인 필요합니다. 탐지 파일은 sample_tool.exe이고 ML 기반 탐지로 보입니다. 아직 다수 단말 확산은 확인되지 않았습니다. 오탐 가능성도 열어두고 파일 해시와 반복 발생 여부 확인하겠습니다.

09:20 김도윤(인프라)
지점 B의 Agent Offline 건은 방화벽 정책 변경 이후 발생한 것으로 보입니다. 현재 18대 정도 Agent 상태가 회색으로 표시됩니다. 네트워크 구간 차단 여부를 우선 확인하고 있습니다.

09:35 정하린(고객대응)
고객사 A 담당자에게 추가 확인 정보 요청 메일 보냈습니다. 사용자 ID, 발생 시각, CWP 화면 캡처, 동일 증상 사용자 수를 요청했습니다. 회신 오면 인증 로그와 정책 적용 상태를 같이 확인하겠습니다.

10:10 박민준(기술지원)
NAC 인증 실패 건은 외부 인증 서버 장애는 아닌 것으로 보입니다. 특정 부서 그룹에 신규 정책이 적용되면서 일부 사용자 그룹 매핑이 누락된 가능성이 있습니다.

10:25 이서연(보안분석)
EDR 탐지 건은 현재 단일 단말에서만 발생했습니다. 파일 해시는 내부 평판 DB에 등록되어 있지 않습니다. 고객에게 파일 경로, 발생 시각, 반복 발생 여부를 추가 요청하는 것이 좋겠습니다.

11:00 김도윤(인프라)
Agent Offline 건은 지점 B 방화벽에서 Policy Server 방향 통신 일부가 차단된 것으로 의심됩니다. 방화벽 정책 담당자에게 확인 요청했습니다. 오후 2시 전까지 1차 회신 예정입니다.

11:30 정하린(고객대응)
SSL 인증서 경고 문의도 들어왔습니다. 관리 콘솔 접속 시 Chrome과 Edge에서 모두 인증서 신뢰 경고가 보인다고 합니다. 최근 인증서 교체 작업 여부를 고객에게 확인 요청했습니다.

13:15 박민준(기술지원)
정책 미적용 건은 변경정책적용 누락 가능성이 있습니다. 관리 콘솔에서 정책 저장은 되었지만 일부 단말에 반영되지 않았습니다. Agent Offline 단말과 정책 미적용 단말이 겹치는지도 확인 중입니다.

14:05 이서연(보안분석)
EDR 탐지 건은 sample_tool.exe가 개발팀 빌드 도구에서 생성된 임시 실행 파일일 가능성이 있습니다. 바로 예외 처리하지 말고, 파일 해시와 배포 경로, 사용 부서 확인 후 검토해야 합니다.

14:40 김도윤(인프라)
지점 B 방화벽 정책 확인 결과, Agent KeepAlive 관련 통신이 일부 차단된 것으로 확인됐습니다. 방화벽 정책 수정 요청했고, 반영 후 Agent 상태가 정상으로 돌아오는지 모니터링하겠습니다.

15:10 정하린(고객대응)
고객사 A에서 인증 실패 사용자 목록을 전달했습니다. 비밀번호 정보는 포함하지 않았고, 사용자 ID와 발생 시간만 공유받았습니다. 민감정보는 마스킹 처리되어 있습니다.

15:45 박민준(기술지원)
인증 실패 건은 사용자 그룹 매핑 오류 가능성이 높습니다. 오늘 중 정책 그룹 조건 수정안을 정리하고, 내일 오전 고객과 함께 적용 여부를 확인할 예정입니다.

16:20 이서연(보안분석)
EDR 탐지 건은 아직 추가 탐지 없습니다. 오늘은 Low~Medium 수준으로 보고, 내일 오전까지 반복 탐지 여부를 모니터링하겠습니다.

16:45 김도윤(인프라)
Agent Offline 건은 방화벽 정책 반영 후 12대가 정상으로 돌아왔고, 6대는 아직 Offline입니다. 남은 단말은 Agent 서비스 상태와 로컬 방화벽 설정을 추가 확인해야 합니다.

17:20 정하린(고객대응)
오늘 고객 회신 필요한 항목 정리했습니다.
1. NAC 인증 실패: 추가 분석 중, 그룹 매핑 확인 예정
2. Agent Offline: 방화벽 정책 일부 수정 완료, 잔여 단말 확인 중
3. EDR 탐지: 단일 단말 탐지, 반복 여부 모니터링 중
4. SSL 인증서 경고: 인증서 교체 여부 확인 대기

17:45 박민준(기술지원)
내일 오전 우선순위는 NAC 정책 그룹 매핑 확인, Agent Offline 잔여 단말 점검, EDR 탐지 반복 여부 확인입니다. 업무보고서에는 고객 회신 완료/진행 중/이슈/내일 계획으로 정리하면 될 것 같습니다.`,
  jira: `ticket_id,task_type,title,owner,status,priority,due_date,customer,related_system,progress,issue_summary,next_action
SX-101,Incident,NAC 인증 실패 원인 분석,박민준,진행 중,High,2026-05-28,고객사 A,SecureX NAC,70%,사용자 그룹 매핑 오류 가능성 확인,정책 그룹 조건 재검토 후 고객과 적용 여부 확인
SX-102,Incident,지점 B Agent Offline 확인,김도윤,진행 중,High,2026-05-28,고객사 B,SecureX NAC Agent,80%,방화벽 정책 수정 후 일부 단말만 정상화,잔여 6대 Agent 서비스 및 로컬 방화벽 확인
SX-103,Security Review,EDR ML 탐지 이벤트 분석,이서연,모니터링,Medium,2026-05-29,고객사 C,SecureX EDR,60%,"단일 단말 ML 탐지, 오탐 가능성 존재",파일 해시와 반복 탐지 여부 모니터링
SX-104,Support,SSL 인증서 경고 문의 대응,정하린,대기,Medium,2026-05-28,고객사 D,SecureX Console,30%,인증서 교체 여부 확인 필요,고객 회신 수신 후 인증서 만료일 및 체인 확인
SX-105,Change,정책 미적용 단말 점검,박민준,진행 중,Medium,2026-05-29,고객사 A,SecureX Policy,50%,정책 저장 후 일부 단말에 반영 안 됨,변경정책적용 여부와 Agent 상태 비교
SX-106,Documentation,고객 회신용 1차 답변 정리,정하린,완료,Low,2026-05-27,공통,Customer Support,100%,고객별 진행 상황 정리 완료,내일 오전 업데이트 사항 반영
SX-107,Monitoring,EDR 탐지 반복 여부 모니터링,이서연,진행 중,Low,2026-05-28,고객사 C,SecureX EDR,40%,"추가 탐지 없음, 추적 필요",내일 오전 이벤트 재확인
SX-108,Infrastructure,방화벽 정책 변경 영향 확인,김도윤,완료,High,2026-05-27,고객사 B,Network,100%,Agent KeepAlive 관련 통신 일부 차단 확인,수정 후 잔여 단말 상태 모니터링
SX-109,Internal,일일 업무보고서 작성,정하린,진행 중,Low,2026-05-27,내부,Reporting,60%,각 담당자 진행상황 취합 중,메신저 대화와 티켓 상태 기반 보고서 초안 작성
SX-110,Follow-up,NAC 인증 실패 고객 미팅 준비,박민준,예정,Medium,2026-05-28,고객사 A,SecureX NAC,10%,내일 오전 고객과 정책 적용 결과 확인 예정,확인 항목 및 예상 질문 정리`
};

// 브라우저 기준 오늘 날짜를 작성일 기본값으로 설정합니다.
function setToday() {
  const today = new Date();
  const offsetDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  reportDateInput.value = offsetDate.toISOString().slice(0, 10);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function getSavedApiKey() {
  return localStorage.getItem(apiKeyStorageName) || "";
}

function updateApiKeyStatus() {
  const hasApiKey = Boolean(getSavedApiKey());
  apiKeyStatus.textContent = hasApiKey ? "API Key 설정됨" : "API Key 미설정";
  apiKeyStatus.classList.toggle("is-empty", !hasApiKey);
}

function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    showToast("저장할 API Key를 입력해 주세요.");
    return;
  }

  localStorage.setItem(apiKeyStorageName, apiKey);
  apiKeyInput.value = "";
  updateApiKeyStatus();
  showToast("API Key를 저장했습니다.");
}

function deleteApiKey() {
  localStorage.removeItem(apiKeyStorageName);
  apiKeyInput.value = "";
  updateApiKeyStatus();
  showToast("API Key를 삭제했습니다.");
}

function getReportDateText() {
  return reportDateInput.value || "날짜 미지정";
}

function updateReportTitle() {
  reportTitle.textContent = `SecureX 일일 업무보고서 - ${getReportDateText()}`;
}

function updateGeneratedAt() {
  const now = new Date();
  generatedAt.textContent = `보고서 생성 시각: ${now.toLocaleString("ko-KR")}`;
}

function resetGeneratedAt() {
  generatedAt.textContent = "보고서 생성 시각: -";
}

function normalizeTaskStatus(status) {
  const allowedStatuses = ["완료", "진행 중", "대기", "모니터링", "예정"];
  return allowedStatuses.includes(status) ? status : "추가 확인 필요";
}

function normalizeTaskPriority(priority) {
  const allowedPriorities = ["High", "Medium", "Low"];
  return allowedPriorities.includes(priority) ? priority : "추가 확인 필요";
}

function getTaskCategory(task, reportDate) {
  const status = normalizeTaskStatus(task.status);
  const priority = normalizeTaskPriority(task.priority);
  const nextAction = getTaskField(task, "next_action");
  const issueSummary = getTaskField(task, "issue_summary");

  if (status === "완료") {
    return "완료 업무";
  }

  if (status === "대기" || issueSummary.includes("확인 필요") || issueSummary.includes("누락")) {
    return "지연/이슈 업무";
  }

  if (nextAction.includes("내일") || getTaskField(task, "due_date") > reportDate || status === "예정") {
    return "내일 예정 업무";
  }

  if (priority === "High") {
    return "지원 필요 업무";
  }

  return "진행 중 업무";
}

function createSummaryRows(tasks, reportDate, messengerText = "") {
  const rows = tasks.map((task) => ({
    category: getTaskCategory(task, reportDate),
    content: maskSensitiveText(getTaskField(task, "title") || "주요 내용 추가 확인 필요"),
    owner: maskSensitiveText(getTaskField(task, "owner") || "추가 확인 필요"),
    status: normalizeTaskStatus(getTaskField(task, "status")),
    priority: normalizeTaskPriority(getTaskField(task, "priority")),
    nextAction: maskSensitiveText(getTaskField(task, "next_action") || "추가 확인 필요")
  }));

  const hasSupportRow = rows.some((row) => row.category === "지원 필요 업무");
  const highPriorityTask = tasks.find((task) => normalizeTaskPriority(task.priority) === "High");

  if (!hasSupportRow && highPriorityTask) {
    rows.push({
      category: "지원 필요 업무",
      content: maskSensitiveText(getTaskField(highPriorityTask, "title") || "High 우선순위 업무 지원 필요"),
      owner: maskSensitiveText(getTaskField(highPriorityTask, "owner") || "추가 확인 필요"),
      status: normalizeTaskStatus(getTaskField(highPriorityTask, "status")),
      priority: "High",
      nextAction: maskSensitiveText(getTaskField(highPriorityTask, "next_action") || "추가 확인 필요")
    });
  }

  const messengerTomorrowNotes = getMessengerTomorrowNotes(messengerText);
  if (messengerTomorrowNotes.length) {
    rows.push({
      category: "내일 예정 업무",
      content: "메신저 대화 기준 내일 확인 항목",
      owner: "추가 확인 필요",
      status: "예정",
      priority: "추가 확인 필요",
      nextAction: maskSensitiveText(messengerTomorrowNotes[0].replace("- 메신저 참고: ", ""))
    });
  }

  return rows.slice(0, 14);
}

function clearSummaryTable() {
  summaryTableBody.innerHTML = "";
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 6;
  cell.className = "empty-cell";
  cell.textContent = emptySummaryMessage;
  row.appendChild(cell);
  summaryTableBody.appendChild(row);
}

function renderSummaryTable(rows) {
  summaryTableBody.innerHTML = "";

  if (!rows.length) {
    clearSummaryTable();
    return;
  }

  rows.forEach((item) => {
    const row = document.createElement("tr");
    if (item.priority === "High") {
      row.classList.add("high-priority-row");
    }

    ["category", "content", "owner", "status", "priority", "nextAction"].forEach((key) => {
      const cell = document.createElement("td");
      cell.textContent = item[key] || "추가 확인 필요";
      row.appendChild(cell);
    });

    summaryTableBody.appendChild(row);
  });
}

function getCurrentSummaryRows() {
  const rows = Array.from(summaryTableBody.querySelectorAll("tr"));
  return rows
    .filter((row) => !row.querySelector(".empty-cell"))
    .map((row) => {
      const cells = Array.from(row.children).map((cell) => cell.textContent.trim());
      return {
        category: cells[0] || "추가 확인 필요",
        content: cells[1] || "추가 확인 필요",
        owner: cells[2] || "추가 확인 필요",
        status: cells[3] || "추가 확인 필요",
        priority: cells[4] || "추가 확인 필요",
        nextAction: cells[5] || "추가 확인 필요"
      };
    });
}

function createTextTable(rows) {
  if (!rows.length) {
    return emptySummaryMessage;
  }

  const headers = ["구분", "주요 내용", "담당자", "상태", "우선순위", "다음 조치"];
  const tableRows = rows.map((row) => [row.category, row.content, row.owner, row.status, row.priority, row.nextAction]);
  const widths = headers.map((header, index) => {
    return Math.max(header.length, ...tableRows.map((row) => String(row[index] || "").length));
  });
  const formatRow = (row) => row.map((cell, index) => String(cell || "").padEnd(widths[index], " ")).join(" | ");
  const divider = widths.map((width) => "-".repeat(width)).join("-|-");

  return [formatRow(headers), divider, ...tableRows.map(formatRow)].join("\n");
}

function getComposedReportText() {
  const bodyText = reportBody.textContent.trim();
  if (!bodyText || bodyText === initialReportMessage) {
    return "";
  }

  const summaryRows = getCurrentSummaryRows();
  return [
    reportTitle.textContent,
    generatedAt.textContent,
    ``,
    `[업무 현황 요약표]`,
    createTextTable(summaryRows),
    ``,
    `[일일 업무보고서 본문]`,
    bodyText
  ].join("\n");
}

function downloadReport() {
  const reportText = getComposedReportText();
  if (!reportText) {
    showToast("다운로드할 보고서가 없습니다.");
    return;
  }

  const fileName = `securex_daily_report_${getReportDateText()}.txt`;
  const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("TXT 파일을 다운로드했습니다.");
}

async function readTextFile(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`${path} 파일을 읽을 수 없습니다.`);
  }
  return response.text();
}

async function loadSampleData() {
  try {
    const [messengerText, jiraText] = await Promise.all([
      readTextFile(sampleFiles.messenger),
      readTextFile(sampleFiles.jira)
    ]);

    messengerInput.value = messengerText.trim();
    jiraInput.value = jiraText.trim();
    showToast("샘플 데이터를 불러왔습니다.");
  } catch (error) {
    messengerInput.value = sampleData.messenger.trim();
    jiraInput.value = sampleData.jira.trim();
    showToast("브라우저 보안 정책으로 파일을 직접 읽지 못해 내장 샘플 데이터를 불러왔습니다.");
  }
}

// 따옴표가 포함된 CSV 행도 기본적으로 처리할 수 있도록 작은 파서를 사용합니다.
function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === "\"" && quoted && nextChar === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function parseJiraCsv(csvText) {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0].replace(/^\uFEFF/, ""));
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce((task, header, index) => {
      task[header] = values[index] || "";
      return task;
    }, {});
  });
}

function countMessengerItems(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\d{2}:\d{2}\s+/.test(line.trim()))
    .length;
}

function groupTasksByStatus(tasks) {
  return tasks.reduce((groups, task) => {
    const status = task.status || "상태 미지정";
    groups[status] = (groups[status] || 0) + 1;
    return groups;
  }, {});
}

function getPriorityTasks(tasks) {
  return tasks.filter((task) => ["High", "Critical"].includes(task.priority));
}

function getTaskField(task, fieldName) {
  return task[fieldName] || "";
}

function formatTaskLine(task) {
  return `- [${task.ticket_id}] ${task.title} / 담당: ${task.owner} / 상태: ${task.status} / 진행률: ${task.progress}`;
}

function formatTaskDetail(task) {
  const nextActionText = getTaskField(task, "next_action");
  const nextAction = nextActionText ? ` / 다음 조치: ${nextActionText}` : "";
  return `- [${task.ticket_id}] ${task.title} / 담당: ${task.owner} / 고객: ${task.customer} / 진행률: ${task.progress}${nextAction}`;
}

function getMessengerTomorrowNotes(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.includes("내일") || line.includes("오전"))
    .slice(0, 4)
    .map((line) => `- 메신저 참고: ${line}`);
}

function ensureInputData() {
  if (!messengerInput.value.trim()) {
    messengerInput.value = sampleData.messenger.trim();
  }

  if (!jiraInput.value.trim()) {
    jiraInput.value = sampleData.jira.trim();
  }
}

function maskSensitiveText(text) {
  return text
    .replace(/sk-[A-Za-z0-9_-]+/g, "[API Key 마스킹 필요]")
    .replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, "[IP 마스킹 필요]")
    .replace(/https?:\/\/[^\s)]+/g, "[내부 URL 마스킹 필요]")
    .replace(/(?:고객사|고객명)\s*[A-Za-z가-힣0-9_-]+/g, "고객명 [마스킹 필요]")
    .replace(/(?:계정|사용자 ID)\s*[:：]?\s*[A-Za-z0-9._-]+/g, "계정 [마스킹 필요]");
}

function buildAiReportPrompt(reportDate, messengerText, jiraText) {
  const maskedMessengerText = maskSensitiveText(messengerText);
  const maskedJiraText = maskSensitiveText(jiraText);

  return [
    `작성일: ${reportDate}`,
    ``,
    `아래 메신저 대화 내용과 JIRA 업무 데이터를 종합해서 SecureX 기술지원팀의 일일 업무보고서 초안을 작성해 주세요.`,
    `보고서 문체는 팀장에게 공유할 수 있는 간결하고 명확한 업무보고서 톤으로 작성해 주세요.`,
    `입력 데이터에 없는 사실은 추측하지 말고 "추가 확인 필요"라고 표시해 주세요.`,
    `고객명, 계정, IP, 내부 URL, API Key 같은 민감정보는 그대로 노출하지 말고 "마스킹 필요"라고 표시해 주세요.`,
    ``,
    `보고서 형식은 반드시 아래 섹션명과 순서를 그대로 사용해 주세요.`,
    `[일일 업무 요약]`,
    `[주요 완료 업무]`,
    `[진행 중 업무]`,
    `[지연/이슈 사항]`,
    `[내일 예정 업무]`,
    `[지원 필요 사항]`,
    `[내부 공유 메모]`,
    ``,
    `--- 메신저 대화 내용 ---`,
    maskedMessengerText,
    ``,
    `--- JIRA 업무 데이터 ---`,
    maskedJiraText
  ].join("\n");
}

function getOpenAIErrorMessage(status) {
  if (status === 401) {
    return "API Key가 유효하지 않습니다.";
  }

  if (status === 429) {
    return "API 호출 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.";
  }

  if (status >= 500) {
    return "OpenAI 서버 오류입니다. 잠시 후 다시 시도해 주세요.";
  }

  return "보고서 생성 중 문제가 발생했습니다. 입력값과 API Key를 확인해 주세요.";
}

function getUserFriendlyAiErrorMessage(error) {
  const knownMessages = [
    "API Key가 유효하지 않습니다.",
    "API 호출 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.",
    "OpenAI 서버 오류입니다. 잠시 후 다시 시도해 주세요.",
    "보고서 생성 중 문제가 발생했습니다. 입력값과 API Key를 확인해 주세요."
  ];

  if (knownMessages.includes(error?.message)) {
    return error.message;
  }

  return "보고서 생성 중 문제가 발생했습니다. 입력값과 API Key를 확인해 주세요.";
}

function extractResponseText(data) {
  if (data.output_text) {
    return data.output_text.trim();
  }

  const outputText = data.output
    ?.flatMap((item) => item.content || [])
    .filter((content) => content.type === "output_text" || content.text)
    .map((content) => content.text || "")
    .join("\n")
    .trim();

  return outputText || "";
}

async function requestAiReport(apiKey, reportDate, messengerText, jiraText) {
  const response = await fetch(OPENAI_RESPONSES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      instructions: [
        `당신은 보안회사 SecureX 기술지원팀의 일일 업무보고서 작성 도우미입니다.`,
        `출력은 한국어로 작성하고, 요청된 7개 섹션 구조를 반드시 지키세요.`,
        `입력에 없는 내용은 추측하지 말고 "추가 확인 필요"라고 표시하세요.`,
        `민감정보는 원문을 노출하지 말고 "마스킹 필요"라고 표시하세요.`
      ].join("\n"),
      input: buildAiReportPrompt(reportDate, messengerText, jiraText)
    })
  });

  if (!response.ok) {
    throw new Error(getOpenAIErrorMessage(response.status));
  }

  const data = await response.json();
  const reportText = maskSensitiveText(extractResponseText(data));

  if (!reportText) {
    throw new Error("보고서 생성 중 문제가 발생했습니다. 입력값과 API Key를 확인해 주세요.");
  }

  return reportText;
}

function createLocalSampleReport() {
  ensureInputData();

  const reportDate = reportDateInput.value;
  const messengerText = messengerInput.value.trim();
  const tasks = parseJiraCsv(jiraInput.value.trim());

  if (!reportDate || tasks.length === 0) {
    showToast("작성일과 JIRA 샘플 데이터를 확인해 주세요.");
    return;
  }

  const completedTasks = tasks.filter((task) => task.status === "완료");
  const activeTasks = tasks.filter((task) => ["진행 중", "모니터링"].includes(task.status));
  const issueTasks = tasks.filter((task) => {
    const issueSummary = getTaskField(task, "issue_summary");
    return ["대기", "예정"].includes(task.status) || issueSummary.includes("확인 필요") || issueSummary.includes("누락");
  });
  const priorityTasks = getPriorityTasks(tasks);
  const tomorrowTasks = tasks.filter((task) => getTaskField(task, "next_action").includes("내일") || getTaskField(task, "due_date") > reportDate);
  const messengerTomorrowNotes = getMessengerTomorrowNotes(messengerText);
  const highPrioritySummary = priorityTasks.map((task) => `- [${task.ticket_id}] ${task.title} / 우선순위: ${task.priority} / 상태: ${task.status}`);
  const summaryRows = createSummaryRows(tasks, reportDate, messengerText);

  const report = [
    `보고서 생성 방식: 로컬 샘플 생성`,
    `안내: 이 로컬 샘플 보고서는 OpenAI API를 호출하지 않으며 API Key 없이 실행 가능합니다.`,
    ``,
    `SecureX 기술지원팀 일일 업무보고서`,
    `작성일: ${reportDate}`,
    ``,
    `[일일 업무 요약]`,
    `- 전체 JIRA 업무 ${tasks.length}건 중 완료 ${completedTasks.length}건, 진행 중 또는 모니터링 ${activeTasks.length}건, 대기/예정 또는 이슈 ${issueTasks.length}건입니다.`,
    `- High 이상 우선순위 업무는 ${priorityTasks.length}건이며 NAC 인증 실패, Agent Offline, 방화벽 정책 영향 확인이 우선 관리 대상입니다.`,
    `- 메신저 대화 기준 내일 확인 또는 오전 재확인이 필요한 언급은 ${messengerTomorrowNotes.length}건입니다.`,
    ``,
    `[주요 완료 업무]`,
    ...(completedTasks.length ? completedTasks.map(formatTaskDetail) : ["- 완료 처리된 업무가 없습니다."]),
    ``,
    `[진행 중 업무]`,
    ...(activeTasks.length ? activeTasks.map(formatTaskDetail) : ["- 진행 중 업무가 없습니다."]),
    ``,
    `[지연/이슈 사항]`,
    ...(issueTasks.length ? issueTasks.map((task) => `- [${task.ticket_id}] ${task.title} / 상태: ${task.status} / 이슈: ${task.issue_summary}`) : ["- 지연 또는 이슈로 분류된 업무가 없습니다."]),
    ``,
    `[내일 예정 업무]`,
    ...(tomorrowTasks.length ? tomorrowTasks.map((task) => `- [${task.ticket_id}] ${task.next_action}`) : ["- 내일 예정 업무가 없습니다."]),
    ...messengerTomorrowNotes,
    ``,
    `[지원 필요 사항]`,
    ...(highPrioritySummary.length ? highPrioritySummary : ["- 즉시 지원이 필요한 High 이상 업무가 없습니다."]),
    `- 고객 회신 지연 또는 정책 변경 확인이 필요한 항목은 담당자별 후속 확인이 필요합니다.`,
    ``,
    `[내부 공유 메모]`,
    `- 이 보고서는 메신저 대화와 JIRA CSV 데이터를 브라우저에서 간단히 분류해 만든 임시 보고서입니다.`,
    `- 완료 업무, 진행 중 업무, 대기 또는 이슈 업무, 우선순위 높은 업무, 내일 확인할 업무가 반영되어 있습니다.`,
    `- AI 보고서 생성이 필요한 경우 API Key 저장 후 AI 보고서 생성 버튼을 사용합니다.`
  ].join("\n");

  updateReportTitle();
  renderSummaryTable(summaryRows);
  reportBody.textContent = report;
  updateGeneratedAt();
  showToast("로컬 샘플 보고서를 생성했습니다.");
}

async function createAiReport() {
  const apiKey = getSavedApiKey();

  if (!apiKey) {
    const message = "API Key가 설정되지 않았습니다. 먼저 API Key를 입력해 주세요.";
    reportBody.textContent = message;
    showToast(message);
    return;
  }

  ensureInputData();

  const reportDate = reportDateInput.value;
  const messengerText = messengerInput.value.trim();
  const jiraText = jiraInput.value.trim();

  if (!reportDate || !messengerText || !jiraText) {
    showToast("작성일, 메신저 내용, JIRA 데이터를 모두 입력해 주세요.");
    return;
  }

  const tasks = parseJiraCsv(jiraText);
  const summaryRows = createSummaryRows(tasks, reportDate, messengerText);

  updateReportTitle();
  renderSummaryTable(summaryRows);
  reportBody.textContent = "AI 보고서를 생성 중입니다...";
  resetGeneratedAt();
  aiReportBtn.disabled = true;

  try {
    const reportText = await requestAiReport(apiKey, reportDate, messengerText, jiraText);
    reportBody.textContent = [
      `보고서 생성 방식: AI 보고서 생성`,
      ``,
      reportText
    ].join("\n");
    updateGeneratedAt();
    showToast("AI 보고서를 생성했습니다.");
  } catch (error) {
    const message = getUserFriendlyAiErrorMessage(error);
    reportBody.textContent = message;
    showToast(message);
  } finally {
    aiReportBtn.disabled = false;
  }
}

async function copyReport() {
  const text = getComposedReportText();
  if (!text) {
    showToast("복사할 보고서가 없습니다.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("보고서를 클립보드에 복사했습니다.");
  } catch (error) {
    showToast("브라우저 권한 문제로 복사하지 못했습니다.");
  }
}

function resetForm() {
  setToday();
  messengerInput.value = "";
  jiraInput.value = "";
  updateReportTitle();
  clearSummaryTable();
  reportBody.textContent = initialReportMessage;
  resetGeneratedAt();
  showToast("입력 내용을 초기화했습니다.");
}

loadSampleBtn.addEventListener("click", loadSampleData);
localSampleReportBtn.addEventListener("click", createLocalSampleReport);
aiReportBtn.addEventListener("click", createAiReport);
copyReportBtn.addEventListener("click", copyReport);
downloadReportBtn.addEventListener("click", downloadReport);
resetBtn.addEventListener("click", resetForm);
saveApiKeyBtn.addEventListener("click", saveApiKey);
deleteApiKeyBtn.addEventListener("click", deleteApiKey);

setToday();
updateReportTitle();
clearSummaryTable();
updateApiKeyStatus();
