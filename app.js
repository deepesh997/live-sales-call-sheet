const{useState,useEffect,useRef,useMemo}=React,STORAGE_KEY="nebula_sales_call_sheet_react_v1",HISTORY_STORAGE_KEY="nebula_call_history_v1",TIMER_STORAGE_KEY="nebula_call_timers_v1",initialFormData={metaCaller:"",metaDatetime:"",metaProspect:"",metaContact:"",metaSource:"",metaAttempt:"1st Attempt",courses:[],leadStages:[],callObjectives:[],targetRoleKnow:"",targetRoleWhy:"",targetSkillKnow:"",targetSkillWhy:"",targetCompanyKnow:"",targetCompanyWhy:"",targetPainKnow:"",targetPainWhy:"",targetUrgencyKnow:"",targetUrgencyWhy:"",hypoInitial:"",hypoEvidence:"",hypoUnknown:"",probes:[{q:"",m:"",f:""},{q:"",m:"",f:""},{q:"",m:"",f:""},{q:"",m:"",f:""},{q:"",m:"",f:""}],discQ1:"",discAns1:"",discF1:"",sig1:[],discQ2:"",discAns2:"",discF2:"",sig2:[],discQ3:"",discAns3:"",discF3:"",synthInitial:"",synthNew:"",synthFinal:"",confidence:"",fitDecision:"",fitEvidence:"",pitch1:"",pitch2:"",pitch3:"",pitch4:"",pitch5:"",pitch6:"",pitch7:"",pitchProspectResponse:"",closeAttempted:"",pitchDecision:"",objections:[{exact:"",cause:"",resp:"",res:""},{exact:"",cause:"",resp:"",res:""}],objCategory:"",objPattern:"",objImprove:"",finalOutcome:"",nextActions:[],actionOwner:"",actionDueDate:"",objEvidenceNeeded:"",learnings:["","","","",""],mandatoryCheck:[],sheetQuality:"",readyNextCall:"",reviewerNotes:"",nebulaSyncStatus:"Not Synced"};function formatDuration(l){const r=Math.floor(l/3600),e=Math.floor(l%3600/60),p=l%60;return r>0?`${String(r).padStart(2,"0")}:${String(e).padStart(2,"0")}:${String(p).padStart(2,"0")}`:`${String(e).padStart(2,"0")}:${String(p).padStart(2,"0")}`}function formatDisplayDateTime(l){if(!l)return"N/A";try{const r=new Date(l);return isNaN(r.getTime())?l:r.toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return l}}const DEFAULT_NEBULA_API_URL="https://nebula.tayanasolutions.com/rest/liveCallSheets",DEFAULT_NEBULA_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjk2ZjI4ZC01MmE3LTQ2MjItOTlmOS1lNWVhN2Q5OThiMWIiLCJ0eXBlIjoiQVBJX0tFWSIsIndvcmtzcGFjZUlkIjoiMTI5NmYyOGQtNTJhNy00NjIyLTk5ZjktZTVlYTdkOTk4YjFiIiwiaWF0IjoxNzY5ODYzMzgwLCJleHAiOjQ5MjMzNzY5NzksImp0aSI6IjQ5YzNhMzVhLWNmMTYtNDhjZC1iYTIxLWY5NDc3MWQ4MDc0NSJ9.2O5kaXOIgEuDGVfkv17AnIPC71GaNv4Te4j7RwCNLxQ",NEBULA_CONFIG_KEY="nebula_api_config_v1";function normalizeNebulaUrl(l){if(!l)return DEFAULT_NEBULA_API_URL;let r=l.trim().replace(/\/+$/,"");return(r.endsWith("/_liveCallSheet")||r.endsWith("/liveCallSheet"))&&(r=r.replace(/\/(_?)liveCallSheet$/,"/liveCallSheets")),r}function extractDateOnly(v){if(!v)return "";try{const d=new Date(v);return isNaN(d.getTime())?"":d.toISOString().split("T")[0]}catch(e){return ""}}function generateUUID(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(l){var r=Math.random()*16|0,e=l==="x"?r:r&3|8;return e.toString(16)})}function toBlocknote(l){return JSON.stringify(l?[{id:generateUUID(),type:"paragraph",props:{textColor:"default",backgroundColor:"default",textAlignment:"left"},content:[{type:"text",text:String(l),styles:{}}],children:[]}]:[])}function toMarkdown(l){return l?String(l):""}const CALL_ATTEMPT_MAP={"1st Attempt":"OPT1ST_ATTEMPT","2nd Attempt":"OPT2ND_ATTEMPT","Follow-up":"FOLLOW_UP","Closing Call":"CLOSING_CALL",OPT1ST_ATTEMPT:"OPT1ST_ATTEMPT",OPT2ND_ATTEMPT:"OPT2ND_ATTEMPT",FOLLOW_UP:"FOLLOW_UP",CLOSING_CALL:"CLOSING_CALL"},COURSE_PITCHED_MAP={"Pro Code Agentic Development":"PRO_CODE_AGENTIC_DEVELOPMENT","No Code Agentic Development":"NO_CODE_AGENTIC_DEVELOPMENT","AI Engineering":"AI_ENGINEERING","ML Engineering":"ML_ENGINEERING","Python Programming":"PYTHON_PROGRAMMING","Full Stack Development":"FULL_STACK_DEVELOPMENT",PRO_CODE_AGENTIC_DEVELOPMENT:"PRO_CODE_AGENTIC_DEVELOPMENT",NO_CODE_AGENTIC_DEVELOPMENT:"NO_CODE_AGENTIC_DEVELOPMENT",AI_ENGINEERING:"AI_ENGINEERING",ML_ENGINEERING:"ML_ENGINEERING",PYTHON_PROGRAMMING:"PYTHON_PROGRAMMING",FULL_STACK_DEVELOPMENT:"FULL_STACK_DEVELOPMENT"},LEAD_STAGE_MAP={"Fresh lead":"FRESH_LEAD","Follow-up":"FOLLOW_UP","Re-engagement":"RE_ENGAGEMENT",Referral:"REFERRAL",FRESH_LEAD:"FRESH_LEAD",FOLLOW_UP:"FOLLOW_UP",RE_ENGAGEMENT:"RE_ENGAGEMENT",REFERRAL:"REFERRAL"},CALL_OBJECTIVE_MAP={Qualify:"QUALIFY",Pitch:"PITCH",Close:"CLOSE","Information only":"INFORMATION_ONLY",QUALIFY:"QUALIFY",PITCH:"PITCH",CLOSE:"CLOSE",INFORMATION_ONLY:"INFORMATION_ONLY"},CONFIDENCE_MAP={High:"HIGH",Medium:"MEDIUM",Low:"LOW",HIGH:"HIGH",MEDIUM:"MEDIUM",LOW:"LOW"},FIT_DECISION_MAP={"Strong fit":"STRONG_FIT","Moderate fit":"MODERATE_FIT","No fit":"NOT_FIT",STRONG_FIT:"STRONG_FIT",MODERATE_FIT:"MODERATE_FIT",NOT_FIT:"NOT_FIT"},CLOSE_ATTEMPTED_MAP={"Asked to enroll":"ASKED_TO_ENROLL","Scheduled call":"SCHEDULED_CALL","No close":"NO_CLOSE",ASKED_TO_ENROLL:"ASKED_TO_ENROLL",SCHEDULED_CALL:"SCHEDULED_CALL",NO_CLOSE:"NO_CLOSE"},DECISION_AT_PITCH_MAP={Enrolled:"ENROLLED","Wants time":"WANTS_TIME",Objected:"OBJECTIVE",Objective:"OBJECTIVE",ENROLLED:"ENROLLED",WANTS_TIME:"WANTS_TIME",OBJECTIVE:"OBJECTIVE"},PRIMARY_OBJECTION_MAP={Price:"PRICE",Time:"TIME",Authority:"AUTHORITY",Fit:"FIT",Trust:"TRUST","Course format":"COURSE_FORMAT",PRICE:"PRICE",TIME:"TIME",AUTHORITY:"AUTHORITY",FIT:"FIT",TRUST:"TRUST",COURSE_FORMAT:"COURSE_FORMAT"},FINAL_OUTCOME_MAP={"Won / enrolled":"WON_ENROLLED","Follow-up scheduled":"FOLLOW_UP_SCHEDULED","Lost - objection unhandled":"LOST_OBJECTION_UNHANDLED","Lost - timing":"LOST_TIMING",Disqualified:"DISQUALIFIED",WON_ENROLLED:"WON_ENROLLED",FOLLOW_UP_SCHEDULED:"FOLLOW_UP_SCHEDULED",LOST_OBJECTION_UNHANDLED:"LOST_OBJECTION_UNHANDLED",LOST_TIMING:"LOST_TIMING",DISQUALIFIED:"DISQUALIFIED"},NEXT_ACTION_MAP={"Send payment link":"SEND_PAYMENT_LINK","Send curriculum":"SEND_CURRICULUM","Send proof/case study":"SEND_PROOF_CASE_STUDY","Schedule follow-up":"SCHEDULE_FOLLOW_UP","Send recording":"SEND_RECORDING","Close lead":"CLOSE_LEAD",SEND_PAYMENT_LINK:"SEND_PAYMENT_LINK",SEND_CURRICULUM:"SEND_CURRICULUM",SEND_PROOF_CASE_STUDY:"SEND_PROOF_CASE_STUDY",SCHEDULE_FOLLOW_UP:"SCHEDULE_FOLLOW_UP",SEND_RECORDING:"SEND_RECORDING",CLOSE_LEAD:"CLOSE_LEAD"},READY_NEXT_CALL_MAP={Yes:"YES","No - review needed":"NO_REVIEW_NEEDED",YES:"YES",NO_REVIEW_NEEDED:"NO_REVIEW_NEEDED"};function LiveCallSheetApp(){const[l,r]=useState(1),[e,p]=useState(initialFormData),[s,S]=useState({1:0,2:0,3:0}),[d,u]=useState(!1),[F,$]=useState(""),[ne,T]=useState(!1),[v,W]=useState(!1),[b,oe]=useState(null),[C,O]=useState(()=>{try{const t=localStorage.getItem(NEBULA_CONFIG_KEY);if(t)return JSON.parse(t).url||DEFAULT_NEBULA_API_URL}catch{}return DEFAULT_NEBULA_API_URL}),[w,D]=useState(()=>{try{const t=localStorage.getItem(NEBULA_CONFIG_KEY);if(t)return JSON.parse(t).token||DEFAULT_NEBULA_TOKEN}catch{}return DEFAULT_NEBULA_TOKEN}),[U,ie]=useState(!1),[A,P]=useState(null),[B,le]=useState(null),[y,R]=useState("push"),[history,setHistory]=useState(()=>{try{const h=localStorage.getItem(HISTORY_STORAGE_KEY);return h?JSON.parse(h):[];}catch{return[];}}),[showHistory,setShowHistory]=useState(!1);
const [currentView, setCurrentView] = useState("dashboard");
const [searchQuery, setSearchQuery] = useState("");
const [filterOutcome, setFilterOutcome] = useState("ALL");
const [filterCourse, setFilterCourse] = useState("ALL");

const startNewCallSheet = () => {
  p(initialFormData);
  S({1: 0, 2: 0, 3: 0});
  r(1);
  u(false);
  oe(null);
  setCurrentView("sheet");
  window.scrollTo({top: 0, behavior: "smooth"});
  h("📝 Blank Live Call Sheet ready (Stage 1: Before Call)");
};

const loadDemoHistory = () => {
  const demos = [{"id": "REC-94821", "timestamp": "2026-09-24T10:30:00.000Z", "prospect": "Vikram Patel", "caller": "Alex Morgan", "date": "2026-09-24", "duration": "18:55", "stageTimes": {"1": 180, "2": 745, "3": 210}, "outcome": "Won / enrolled", "courses": ["Pro Code Agentic Development"], "leadStages": ["Fresh lead"], "callObjectives": ["Qualify", "Pitch", "Close"], "contactInfo": "vikram.patel@techcorp.io / +91 98765 43210", "callSource": "LinkedIn Ad - Agentic AI Playbook", "callAttempt": "1st Attempt", "fitDecision": "Strong fit", "validatedMotive": "Needs immediate hands-on multi-agent architecture to prevent $150k fintech client churn.", "nextActions": ["Send payment link", "Send proof/case study"], "actionOwner": "Alex Morgan", "actionDueDate": "2026-09-25T11:00", "formData": {"metaCaller": "Alex Morgan", "metaDatetime": "2026-09-24T10:30", "metaProspect": "Vikram Patel", "metaContact": "vikram.patel@techcorp.io / +91 98765 43210", "metaSource": "LinkedIn Ad - Agentic AI Playbook", "metaAttempt": "1st Attempt", "courses": ["Pro Code Agentic Development"], "leadStages": ["Fresh lead"], "callObjectives": ["Qualify", "Pitch", "Close"], "targetRoleKnow": "Senior Backend / Cloud Architect (10+ yrs exp)", "targetRoleWhy": "Leading team transformation towards autonomous agent workflows", "targetSkillKnow": "Python, FastAPI, AWS, Docker; zero production LangGraph", "targetSkillWhy": "Needs enterprise orchestrator patterns", "targetCompanyKnow": "Mid-tier enterprise consultancy servicing US fintech clients", "targetCompanyWhy": "Client RFPs mandate production-grade LLM guardrails", "targetPainKnow": "Downloaded the Agentic AI curriculum, clicked 3 times on syllabus", "targetPainWhy": "Needs code-level depth, not slide overviews", "targetUrgencyKnow": "Budget approved for Q4 professional upskilling", "targetUrgencyWhy": "Authority up to $2,500 on company card", "hypoInitial": "Wants to lead Generative AI task force at his firm.", "hypoEvidence": "Visited curriculum page 3 times.", "hypoUnknown": "Whether company will reimburse directly or if he is personally investing upfront.", "probes": [{"q": "What specific client deliverables or agent use-cases is your team tasked with rolling out this quarter?", "m": "Reveals urgency and corporate mandate.", "f": "How are you currently managing latency and hallucinations?"}, {"q": "When you build agents today, what has been the biggest bottleneck?", "m": "Identifies technical pain point.", "f": "How much engineering time is lost per sprint?"}, {"q": "If you don't bridge this architectural gap in 60 days, what is the cost?", "m": "Business impact and urgency multiplier.", "f": "Who else is depending on this?"}, {"q": "How will leadership evaluate whether you are the right person to lead this?", "m": "Personal career validation.", "f": "Would 3 production-grade capstones solidify that?"}, {"q": "Are you sponsoring this through learning allowance or personal card?", "m": "Buying authority.", "f": "Can an employer reimbursement packet confirm your seat today?"}], "discQ1": "What made you prioritize agentic development right now?", "discAns1": "Our US client is threatening to move their contract to an offshore vendor with agent workflows.", "discF1": "How soon do you need to demo a functioning autonomous agent?", "sig1": ["Pain", "Urgency", "Authority"], "discQ2": "What has your experience been with online tutorials so far?", "discAns2": "Everything on YouTube is a trivial toy demo. Nobody teaches memory persistence or multi-tenant telemetry.", "discF2": "If our mentors walk you through building that exact harness, how would that change your confidence?", "sig2": ["Goal", "Budget"], "discQ3": "What happens if you launch without proven guardrails?", "discAns3": "Direct compliance failure with banking client regulations.", "discF3": "What is the revenue impact of that account?", "synthInitial": "Believed he wanted general GenAI upskilling.", "synthNew": "Actual urgency is retaining an active $150k enterprise client account within 30 days.", "synthFinal": "Needs immediate hands-on multi-agent architecture to prevent $150k fintech client churn.", "confidence": "High", "fitDecision": "Strong fit", "fitEvidence": "Client-driven urgency, strong Python foundation, corporate credit card ready.", "pitch1": "Earlier you mentioned your US client contract is at risk within 30 days. That is exactly why we built this.", "pitch2": "Most senior architects tell us the hardest part is bridging toy LLM scripts into robust enterprise architectures.", "pitch3": "If this is not solved in the next 30 days, you risk losing an active $150k client account.", "pitch4": "What you need is not another high-level tutorial, it is a mentor-led production build sprint.", "pitch5": "The reason this works for your team is that our mentors build enterprise multi-agent harnesses in banking daily.", "pitch6": "By week 4, you will have built your client's exact proof-of-concept with state persistence as your capstone.", "pitch7": "Based on protecting that client contract, shall we reserve your cohort seat today?", "pitchProspectResponse": "The curriculum covers exactly what we need. Ensure the weekend sessions fit my timezone.", "closeAttempted": "Asked to enroll", "pitchDecision": "Enrolled", "objections": [{"exact": "Can I expense this under my corporate card and get an official GST/tax invoice?", "cause": "Administrative payment processing confirmation", "resp": "Confirmed instant automated GST invoice issuance upon checkout", "res": "Resolved"}], "objCategory": "Authority", "finalOutcome": "Won / enrolled", "nextActions": ["Send payment link", "Send proof/case study"], "actionOwner": "Alex Morgan", "actionDueDate": "2026-09-25T11:00", "objEvidenceNeeded": "Send GST invoice template and Employer Expense Pitch Deck", "learnings": ["Fear of client account loss is 10x more compelling than personal career upskilling.", "Probe #1 on client deliverables instantly unlocked his true motive.", "Assumed he was paying out of pocket; corporate credit card was immediately approved.", "Need to highlight GST invoice format explicitly before prospect asks.", "Emphasize company reimbursement guarantee on landing page."], "mandatoryCheck": ["target_hypo", "probes_5", "prospect_ans", "buying_motive", "custom_pitch", "obj_log", "outcome", "next_action"], "sheetQuality": "5", "readyNextCall": "Yes", "reviewerNotes": "Flawless call execution. Probing was surgical and customized pitch addressed prospect verbatim quotes directly.", "nebulaSyncStatus": "Synced to Nebula"}}, {"id": "REC-94822", "timestamp": "2026-09-23T14:15:00.000Z", "prospect": "Ananya Sharma", "caller": "Alex Morgan", "date": "2026-09-23", "duration": "22:15", "stageTimes": {"1": 240, "2": 890, "3": 205}, "outcome": "Follow-up scheduled", "courses": ["AI Engineering"], "leadStages": ["Fresh lead"], "callObjectives": ["Qualify", "Pitch"], "contactInfo": "ananya.s@cloudscale.net / +91 99123 45678", "callSource": "Website Inbound Form", "callAttempt": "1st Attempt", "fitDecision": "Strong fit", "validatedMotive": "Needs to transition internal SaaS analytics product to RAG + Fine-tuned models before Q1 product launch.", "nextActions": ["Schedule follow-up", "Send curriculum"], "actionOwner": "Alex Morgan", "actionDueDate": "2026-09-26T15:00", "formData": {"metaCaller": "Alex Morgan", "metaDatetime": "2026-09-23T14:15", "metaProspect": "Ananya Sharma", "metaContact": "ananya.s@cloudscale.net / +91 99123 45678", "metaSource": "Website Inbound Form", "metaAttempt": "1st Attempt", "courses": ["AI Engineering"], "leadStages": ["Fresh lead"], "callObjectives": ["Qualify", "Pitch"], "targetRoleKnow": "Lead Software Engineer (7 yrs)", "targetRoleWhy": "Wants to take technical lead on GenAI roadmap", "targetSkillKnow": "Node.js, Python, PostgreSQL; evaluating vector databases", "targetSkillWhy": "Stuck on advanced chunking, hybrid search, and evaluation metrics", "targetCompanyKnow": "B2B SaaS with 80+ employees", "targetCompanyWhy": "Product roadmap features AI co-pilot in Q1", "targetPainKnow": "Struggling with evaluation metrics for RAG accuracy", "targetPainWhy": "Current POC has 35% hallucination rate on domain documents", "targetUrgencyKnow": "Q1 roadmap launch deadline in January", "targetUrgencyWhy": "Leadership is pushing for prototype demo in 3 weeks", "hypoInitial": "Needs AI Engineering syllabus to build corporate co-pilot.", "hypoEvidence": "Requested technical whitepaper and evaluation benchmark.", "hypoUnknown": "Has budget sign-off from VP Engineering.", "probes": [{"q": "What is the biggest roadblock in your AI co-pilot prototype?", "m": "Identifies technical bottleneck.", "f": "What accuracy benchmark does leadership require?"}, {"q": "Who is evaluating the final architecture with you?", "m": "Identifies decision authority.", "f": "Should we invite your VP of Eng to the technical walkthrough?"}], "discQ1": "Where does your prototype break down?", "discAns1": "Our retrieval precision is low and we do not have a systematic eval harness to measure improvements.", "discF1": "How are you tracking latency across chunk sizes?", "sig1": ["Pain", "Urgency"], "synthInitial": "Needs general AI knowledge.", "synthNew": "Needs production RAG evaluation and hybrid search patterns specifically for SaaS compliance.", "synthFinal": "Needs to transition internal SaaS analytics product to RAG + Fine-tuned models before Q1 product launch.", "confidence": "High", "fitDecision": "Strong fit", "fitEvidence": "Clear business deadline, strong engineering capabilities, leadership backing.", "pitch1": "You noted your prototype is hallucinating on domain docs and needs a production evaluation harness.", "pitch2": "Most leads tell us RAG in tutorials works until real messy enterprise schemas are indexed.", "pitch3": "If this is not solved in 3 weeks, the Q1 co-pilot launch date will slip.", "pitch4": "What you need is an architecture review and hands-on guidance on Ragas/DeepEval and hybrid search.", "pitch5": "Our instructors built RAG systems for Fortune 500 document search handling millions of queries.", "pitch6": "You will build the exact evaluation pipeline as your module project.", "pitch7": "Shall we schedule a 15-minute syllabus walkthrough with your VP of Eng on Thursday?", "pitchProspectResponse": "Yes, Thursday at 3 PM works. Send over the detailed evaluation syllabus beforehand.", "closeAttempted": "Scheduled call", "pitchDecision": "Wants time", "objections": [{"exact": "I need my VP of Engineering to review the technical depth before signing off.", "cause": "Dual stakeholder sign-off", "resp": "Offered a tailored technical curriculum session with our lead instructor", "res": "Resolved"}], "objCategory": "Authority", "finalOutcome": "Follow-up scheduled", "nextActions": ["Schedule follow-up", "Send curriculum"], "actionOwner": "Alex Morgan", "actionDueDate": "2026-09-26T15:00", "objEvidenceNeeded": "Send RAG Evaluation Syllabus and Architecture Overview", "learnings": ["Always ask about co-pilot launch deadlines early.", "VP of Engineering needs technical syllabus.", "Evaluation metrics are her highest intent pain point."], "mandatoryCheck": ["target_hypo", "probes_5", "prospect_ans", "buying_motive", "custom_pitch", "obj_log", "outcome", "next_action"], "sheetQuality": "4", "readyNextCall": "Yes", "reviewerNotes": "Solid qualification. Good objection handling around authority.", "nebulaSyncStatus": "Synced to Nebula"}}, {"id": "REC-94823", "timestamp": "2026-09-22T11:00:00.000Z", "prospect": "Marcus Vance", "caller": "Alex Morgan", "date": "2026-09-22", "duration": "14:30", "stageTimes": {"1": 150, "2": 570, "3": 150}, "outcome": "Follow-up scheduled", "courses": ["ML Engineering"], "leadStages": ["Follow-up"], "callObjectives": ["Qualify", "Pitch"], "contactInfo": "marcus.v@logitechsolutions.com / +1 (415) 890-1234", "callSource": "Webinar Attendee", "callAttempt": "2nd Attempt", "fitDecision": "Moderate fit", "validatedMotive": "Looking to upskill 4 engineers on MLOps pipeline and model monitoring.", "nextActions": ["Send proof/case study", "Send curriculum"], "actionOwner": "Alex Morgan", "actionDueDate": "2026-09-28T16:00", "formData": {"metaCaller": "Alex Morgan", "metaDatetime": "2026-09-22T11:00", "metaProspect": "Marcus Vance", "metaContact": "marcus.v@logitechsolutions.com / +1 (415) 890-1234", "metaSource": "Webinar Attendee", "metaAttempt": "2nd Attempt", "courses": ["ML Engineering"], "leadStages": ["Follow-up"], "callObjectives": ["Qualify", "Pitch"], "targetRoleKnow": "Director of Engineering (12 yrs)", "targetRoleWhy": "Evaluating team training packages", "targetSkillKnow": "Kubernetes, CI/CD, PyTorch basics", "targetSkillWhy": "Need automated CI/CD for model re-training", "targetCompanyKnow": "Supply chain analytics software firm", "targetCompanyWhy": "Expanding predictive delivery algorithms", "targetPainKnow": "Models take 6 weeks to deploy from Jupyter notebook to Kubernetes cluster", "targetPainWhy": "Huge time to value lag", "targetUrgencyKnow": "H2 budget cycle closing in 4 weeks", "targetUrgencyWhy": "Need to allocate unspent training funds", "hypoInitial": "Wants corporate group discount for his ML team.", "hypoEvidence": "Asked about team volume pricing in webinar chat.", "hypoUnknown": "Exact team headcount and tech stack alignment.", "probes": [{"q": "How many engineers need MLOps pipeline training this quarter?", "m": "Team size and budget.", "f": "Are they primarily data scientists or DevOps engineers?"}], "discQ1": "What is the biggest delay in your model release cycle?", "discAns1": "Our data scientists write Jupyter notebooks and hand them over the fence to DevOps. It takes 6 weeks to deploy.", "discF1": "How many models are queued waiting for deployment right now?", "sig1": ["Pain", "Budget"], "synthInitial": "Individual learner looking for ML course.", "synthNew": "Corporate team lead needing standardized MLOps pipeline curriculum for 4 engineers.", "synthFinal": "Looking to upskill 4 engineers on MLOps pipeline and model monitoring.", "confidence": "Medium", "fitDecision": "Moderate fit", "fitEvidence": "Team budget available, but needs custom group agreement.", "pitch1": "You mentioned model deployments currently take 6 weeks from Jupyter to production.", "pitch2": "Most engineering directors say the silo between data science and DevOps destroys deployment velocity.", "pitch3": "If this is not standardized, your predictive delivery models will continually miss quarterly SLAs.", "pitch4": "What your team needs is an end-to-end MLOps pipeline sprint covering MLflow, Kubeflow, and automated drift detection.", "pitch5": "Our curriculum is built directly on production cloud MLOps architectures.", "pitch6": "Your team will build an automated CI/CD re-training pipeline during the cohort.", "pitch7": "Shall I send the 4-seat corporate group pricing and schedule a team syllabus alignment call?", "pitchProspectResponse": "Send the corporate proposal and case studies on similar logistics deployments.", "closeAttempted": "Scheduled call", "pitchDecision": "Wants time", "objections": [{"exact": "We need to compare this against AWS native training offerings.", "cause": "Vendor evaluation", "resp": "Highlighted hands-on mentor code reviews vs self-paced generic videos", "res": "Resolved"}], "objCategory": "Fit", "finalOutcome": "Follow-up scheduled", "nextActions": ["Send proof/case study", "Send curriculum"], "actionOwner": "Alex Morgan", "actionDueDate": "2026-09-28T16:00", "objEvidenceNeeded": "Send Logistics MLOps Case Study and Corporate Team Pricing", "learnings": ["Team training requests need immediate enterprise collateral.", "Emphasize mentor code reviews over AWS self-study videos."], "mandatoryCheck": ["target_hypo", "probes_5", "prospect_ans", "buying_motive", "custom_pitch", "obj_log", "outcome", "next_action"], "sheetQuality": "4", "readyNextCall": "Yes", "reviewerNotes": "High-value corporate team deal. Follow up with case studies promptly.", "nebulaSyncStatus": "Synced to Nebula"}}];
  setHistory(demos);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(demos));
  } catch (err) {}
  h("✨ Loaded 3 enterprise sales call records with full analytics!");
};

const analytics = useMemo(() => {
  const total = history.length;
  if (total === 0) {
    return { total: 0, won: 0, wonRate: 0, followUps: 0, fitRate: 0, avgDuration: "00:00", avgDurationSec: 0, totalDurationSec: 0 };
  }
  let wonCount = 0;
  let followUpCount = 0;
  let strongOrModFitCount = 0;
  let totalSeconds = 0;

  history.forEach(item => {
    const outcome = (item.outcome || item.formData?.finalOutcome || "").toLowerCase();
    if (outcome.includes("won") || outcome.includes("enrolled")) wonCount++;
    if (outcome.includes("follow-up") || outcome.includes("followup")) followUpCount++;

    const fit = (item.fitDecision || item.formData?.fitDecision || "").toLowerCase();
    if (fit.includes("strong") || fit.includes("moderate")) strongOrModFitCount++;

    const st = item.stageTimes || {};
    const itemSec = (st[1] || 0) + (st[2] || 0) + (st[3] || 0);
    totalSeconds += itemSec;
  });

  const wonRate = Math.round((wonCount / total) * 100);
  const fitRate = Math.round((strongOrModFitCount / total) * 100);
  const avgSec = Math.round(totalSeconds / total);

  return {
    total,
    won: wonCount,
    wonRate,
    followUps: followUpCount,
    fitRate,
    avgDuration: formatDuration(avgSec),
    avgDurationSec: avgSec,
    totalDurationSec: totalSeconds
  };
}, [history]);

const filteredHistory = useMemo(() => {
  return history.filter(item => {
    if (filterOutcome !== "ALL") {
      const out = (item.outcome || item.formData?.finalOutcome || "").toLowerCase();
      if (filterOutcome === "WON" && !out.includes("won") && !out.includes("enrolled")) return false;
      if (filterOutcome === "FOLLOW_UP" && !out.includes("follow-up") && !out.includes("followup")) return false;
      if (filterOutcome === "LOST" && !out.includes("lost")) return false;
      if (filterOutcome === "DISQUALIFIED" && !out.includes("disqualified")) return false;
    }
    if (filterCourse !== "ALL") {
      const courses = item.courses || item.formData?.courses || [];
      if (!courses.includes(filterCourse)) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const prospect = (item.prospect || "").toLowerCase();
      const caller = (item.caller || item.formData?.metaCaller || "").toLowerCase();
      const contact = (item.contactInfo || item.formData?.metaContact || "").toLowerCase();
      const motive = (item.validatedMotive || item.formData?.synthFinal || "").toLowerCase();
      const course = ((item.courses || item.formData?.courses || []).join(" ")).toLowerCase();
      if (!prospect.includes(q) && !caller.includes(q) && !contact.includes(q) && !motive.includes(q) && !course.includes(q)) {
        return false;
      }
    }
    return true;
  });
}, [history, filterOutcome, filterCourse, searchQuery]);

const deleteHistoryItem = id => {
  if (confirm("Delete this call record from records?")) {
    setHistory(prev => {
      const up = prev.filter(item => item.id !== id);
      try { localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(up)); } catch (e) {}
      return up;
    });
    h("Record deleted from history");
  }
};

const clearAllHistory = () => {
  if (confirm("Are you sure you want to clear all call records?")) {
    setHistory([]);
    try { localStorage.removeItem(HISTORY_STORAGE_KEY); } catch (e) {}
    h("All call records cleared");
  }
};

const loadHistoryIntoSheet = item => {
  if (confirm('Load call sheet for "' + (item.prospect || "prospect") + '" into live worksheet? Current unsaved edits will be replaced.')) {
    p(item.formData || initialFormData);
    if (item.stageTimes) S(item.stageTimes);
    oe(item.id || null);
    r(1);
    setCurrentView("sheet");
    window.scrollTo({ top: 0, behavior: "smooth" });
    h("Loaded call record for " + (item.prospect || "prospect") + " into sheet!");
  }
};
useEffect(()=>{try{localStorage.setItem(NEBULA_CONFIG_KEY,JSON.stringify({url:C,token:w}))}catch{}},[C,w]);const N=useMemo(()=>s[1]+s[2]+s[3],[s]),h=t=>{$(t),setTimeout(()=>{$("")},2800)};useEffect(()=>{try{const t=localStorage.getItem(STORAGE_KEY);t&&p(JSON.parse(t));const a=localStorage.getItem(TIMER_STORAGE_KEY);if(a){const n=JSON.parse(a);n.stageTimes&&S(n.stageTimes),n.stage&&r(n.stage),n.isTimerRunning&&u(!0)}}catch(t){console.error("Error loading stored call sheet data",t)}},[]),useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(e))},[e]),useEffect(()=>{let t=null;return d?t=setInterval(()=>{S(a=>{const n={...a,[l]:a[l]+1};return localStorage.setItem(TIMER_STORAGE_KEY,JSON.stringify({stageTimes:n,stage:l,isTimerRunning:!0})),n})},1e3):localStorage.setItem(TIMER_STORAGE_KEY,JSON.stringify({stageTimes:s,stage:l,isTimerRunning:!1})),()=>clearInterval(t)},[d,l]);const o=(t,a)=>{if(!d&&(u(!0),!e.metaDatetime)){const n=new Date,i=g=>String(g).padStart(2,"0"),c=`${n.getFullYear()}-${i(n.getMonth()+1)}-${i(n.getDate())}T${i(n.getHours())}:${i(n.getMinutes())}`;p(g=>({...g,[t]:a,metaDatetime:c}));return}p(n=>({...n,[t]:a}))},f=(t,a)=>{d||u(!0),p(n=>{const i=n[t]||[];return i.includes(a)?{...n,[t]:i.filter(c=>c!==a)}:{...n,[t]:[...i,a]}})},L=(t,a,n)=>{d||u(!0),p(i=>{const c=[...i.probes];return c[t]={...c[t],[a]:n},{...i,probes:c}})},E=(t,a,n)=>{d||u(!0),p(i=>{const c=[...i.objections];return c[t]={...c[t],[a]:n},{...i,objections:c}})},se=(t,a)=>{d||u(!0),p(n=>{const i=[...n.learnings];return i[t]=a,{...n,learnings:i}})},j=()=>{l===1?(r(2),u(!0),window.scrollTo({top:0,behavior:"smooth"}),h("\u{1F4DE} Transitioned to Stage 2: During Call (Live call timer active)")):l===2&&(r(3),u(!0),window.scrollTo({top:0,behavior:"smooth"}),h("\u{1F3C1} Transitioned to Stage 3: After Call (Wrap up & Nebula CRM)"))},Q=()=>{l>1&&(r(l-1),window.scrollTo({top:0,behavior:"smooth"}))},G=()=>{u(!d)},H=()=>{confirm("Reset call timers for all stages?")&&(S({1:0,2:0,3:0}),u(!1),localStorage.removeItem(TIMER_STORAGE_KEY),h("Timers have been reset"))},re=()=>{confirm("Are you sure you want to clear this entire call sheet and reset timers?")&&(p(initialFormData),S({1:0,2:0,3:0}),r(1),u(!1),localStorage.removeItem(STORAGE_KEY),localStorage.removeItem(TIMER_STORAGE_KEY),h("Worksheet reset to clean state"))},ce=()=>{p({metaCaller:"Alex Morgan",metaDatetime:"2026-09-23T15:30",metaProspect:"Vikram Patel",metaContact:"vikram.patel@techcorp.io / +91 98765 43210",metaSource:"LinkedIn Ad - Agentic AI Playbook",metaAttempt:"1st Attempt",courses:["Pro Code Agentic Development"],leadStages:["Fresh lead"],callObjectives:["Qualify","Pitch","Close"],targetRoleKnow:"Senior Backend / Cloud Architect (10+ yrs exp)",targetRoleWhy:"Leading team transformation towards autonomous agent workflows; high accountability",targetSkillKnow:"Python, FastAPI, AWS, Docker; zero production LangGraph / Multi-agent setup",targetSkillWhy:"Feels at risk of being sidelined by younger engineers who use modern AI orchestrators",targetCompanyKnow:"Mid-tier enterprise consultancy servicing US fintech clients",targetCompanyWhy:"Client RFPs now mandate production-grade LLM guardrails and agent architectures",targetPainKnow:"Downloaded the Agentic AI curriculum, clicked 3 times on the live cohort syllabus",targetPainWhy:"Needs deep engineering depth with code-level capstones, not high-level slide overviews",targetUrgencyKnow:"Budget approved for Q4 professional upskilling; manager appraisal in 6 weeks",targetUrgencyWhy:"Has financial authority up to $2,500 on company corporate card without second approver",hypoInitial:"Wants to lead the newly formed Generative AI task force at his firm and needs verified multi-agent architecture credentials.",hypoEvidence:"Visited curriculum page 3 times, requested corporate invoice receipt sample.",hypoUnknown:"Whether company will reimburse directly or if he is personally investing upfront today.",probes:[{q:"What specific client deliverables or agent use-cases is your team tasked with rolling out this quarter?",m:"Reveals if this is an urgent corporate mandate or casual curiosity.",f:"How are you currently preventing hallucination and managing latency in that workflow?"},{q:"When you build agents today, what has been the biggest bottleneck between prototyping and production deployment?",m:"Identifies exact technical pain point (evaluation, streaming, state persistence).",f:"How much time is your engineering team losing dealing with that every sprint?"},{q:"If you don't bridge this architectural gap in the next 60 days, what is the cost to your current project timeline?",m:"Measures business impact and urgency multiplier.",f:"Who else is depending on this being delivered successfully?"},{q:"How will your leadership evaluate whether you are the right person to lead this AI initiative?",m:"Uncovers internal political motive and personal career validation.",f:"Would having 3 production-grade enterprise agent deployments in your portfolio solidify that leadership position?"},{q:"Are you planning to sponsor this through your company's annual learning allowance or your personal card?",m:"Clarifies buying authority and purchasing timeline friction.",f:"If we can provide an instant employer reimbursement packet today, would that allow you to confirm your seat immediately?"}],discQ1:"What made you prioritize agentic development right now over other engineering priorities?",discAns1:'"Our US client is threatening to move their contract to an offshore vendor who already has production agent workflows running."',discF1:"How soon do you need to demo a functioning autonomous agent to retain their confidence?",sig1:["Pain","Urgency","Authority"],discQ2:"What has your experience been with online tutorials or standard documentation so far?",discAns2:'"Everything on YouTube is a trivial toy demo. Nobody teaches memory persistence, real tool calling fallbacks, and multi-tenant telemetry."',discF2:"If our mentors walk you through building that exact production harness, how would that change your confidence?",sig2:["Goal","Budget"],discQ3:"What happens if you launch without proven guardrails?",discAns3:'"Direct compliance failure with banking client regulations."',discF3:"What is the revenue impact of that account?",synthInitial:"Believed he wanted general GenAI upskilling for career change.",synthNew:"Actual urgency is retaining an active $150k enterprise client account within 30 days.",synthFinal:"Needs immediate hands-on multi-agent production architecture to prevent client churn.",confidence:"High",fitDecision:"Strong fit",fitEvidence:"Client-driven urgency, strong Python foundation, corporate credit card ready.",pitch1:"From what you shared, your client needs a production agent architecture within 30 days, and you cannot afford toy demo tutorials.",pitch2:"The real issue seems to be lack of battle-tested enterprise patterns for agent orchestration, state persistence, and fallbacks.",pitch3:"If this continues, you risk losing an active client contract and falling behind the internal AI transformation mandate.",pitch4:"What you want is a guided, intensive build cohort where you build your actual enterprise capstone under expert code review.",pitch5:"This training helps because our mentors are lead AI architects who run these exact systems in production daily.",pitch6:"The reason this is practical for you is that you can build your client's prototype directly as your capstone project.",pitch7:"Based on your goal of saving the client contract this month, shall we secure your seat in the cohort starting this Saturday?",pitchProspectResponse:'"The curriculum covers exactly what we need. I just want to ensure the weekend sessions fit my timezone."',closeAttempted:"Asked to enroll",pitchDecision:"Enrolled",objections:[{exact:'"Can I expense this under my corporate card and get an official GST/tax invoice with our company name?"',cause:"Administrative payment processing confirmation",resp:"Confirmed instant automated GST invoice issuance upon checkout with custom corporate company fields",res:"Resolved"},{exact:"",cause:"",resp:"",res:""}],objCategory:"Authority",objPattern:"Corporate reimbursement documentation clarity needed prior to checkout",objImprove:"Include downloadable Employer Expense Pitch Deck on the checkout landing page",finalOutcome:"Won / enrolled",nextActions:["Send payment link","Send proof/case study"],actionOwner:"Alex Morgan",actionDueDate:"2026-09-24T11:00",objEvidenceNeeded:"Send GST invoice template sample and Employer Reimbursement cheat sheet to prospect via WhatsApp & Email",learnings:["Fear of client account loss is 10x more compelling than personal salary hike.","Probe #1 on client deliverables instantly unlocked his true motive.","Assumed he was paying out of pocket; company card was available immediately.","Need to highlight GST invoice format explicitly before the prospect asks.","Highlight corporate reimbursement approval guarantee on syllabus page."],mandatoryCheck:["target_hypo","probes_5","prospect_ans","buying_motive","custom_pitch","obj_log","outcome","next_action"],sheetQuality:"5",readyNextCall:"Yes",reviewerNotes:"Flawless call execution. Probing was surgical and customized pitch addressed prospect verbatim quotes directly.",nebulaSyncStatus:"Not Synced"}),S({1:180,2:745,3:210}),u(!0),h("Loaded sample enterprise sales call data! \u{1FA84}")},Y=()=>{const t=new Date().toISOString(),a=`Role/Experience: ${e.targetRoleKnow||"N/A"}
Why this matters: ${e.targetRoleWhy||"N/A"}`,n=`Skill/Tooling Level: ${e.targetSkillKnow||"N/A"}
Why this matters: ${e.targetSkillWhy||"N/A"}`,i=`Company/Industry: ${e.targetCompanyKnow||"N/A"}
Why this matters: ${e.targetCompanyWhy||"N/A"}`,c=`Stated Pain/Interest: ${e.targetPainKnow||"N/A"}
Why this matters: ${e.targetPainWhy||"N/A"}`,g=`Timeline/Urgency: ${e.targetUrgencyKnow||"N/A"}
Why this matters: ${e.targetUrgencyWhy||"N/A"}`,I=(e.probes||[]).map((m,_)=>`Probe ${_+1}: ${m.q||"N/A"}
  - Motive Probed: ${m.m||"N/A"}
  - Follow-up: ${m.f||"N/A"}`).join(`

`),J=[e.discQ1?`Q1: ${e.discQ1}`:"",e.discQ2?`Q2: ${e.discQ2}`:"",e.discQ3?`Q3: ${e.discQ3}`:""].filter(Boolean).join(`
`)||e.discQ1||"",q=[e.discAns1?`A1: ${e.discAns1}`:"",e.discAns2?`A2: ${e.discAns2}`:"",e.discAns3?`A3: ${e.discAns3}`:""].filter(Boolean).join(`
`)||e.discAns1||"",z=[e.sig1&&e.sig1.length?`Q1 Signals: ${e.sig1.join(", ")}`:"",e.sig2&&e.sig2.length?`Q2 Signals: ${e.sig2.join(", ")}`:""].filter(Boolean).join(`
`)||"",X=[e.discF1?`F1: ${e.discF1}`:"",e.discF2?`F2: ${e.discF2}`:"",e.discF3?`F3: ${e.discF3}`:""].filter(Boolean).join(`
`)||"",Z=(e.objections||[]).filter(m=>(m.exact||"").trim()||(m.resp||"").trim()).map((m,_)=>`Objection ${_+1}: "${m.exact||""}"
  - Root Cause: ${m.cause||"N/A"}
  - Response: ${m.resp||"N/A"}
  - Resolution: ${m.res||"N/A"}`).join(`

`)||"No objections logged",ee=`Owner: ${e.actionOwner||"Unassigned"} | Due: ${e.actionDueDate||"N/A"}`,te=e.sheetQuality?`Quality Rating: ${e.sheetQuality} / 5`:"",de=e.courses&&e.courses.length>0&&COURSE_PITCHED_MAP[e.courses[0]]||"PRO_CODE_AGENTIC_DEVELOPMENT",pe=e.leadStages&&e.leadStages.length>0&&LEAD_STAGE_MAP[e.leadStages[0]]||"FRESH_LEAD",he=e.callObjectives&&e.callObjectives.length>0&&CALL_OBJECTIVE_MAP[e.callObjectives[0]]||"QUALIFY",ue=e.nextActions&&e.nextActions.length>0&&NEXT_ACTION_MAP[e.nextActions[0]]||null,ae={timingMetrics:{stage1_beforeCall_seconds:s[1],stage1_formatted:formatDuration(s[1]),stage2_duringCall_seconds:s[2],stage2_formatted:formatDuration(s[2]),stage3_afterCall_seconds:s[3],stage3_formatted:formatDuration(s[3]),totalCall_seconds:N,totalCall_formatted:formatDuration(N)},clientApp:"Nebula CRM Live Call Sheet",version:"2.5",allSelectedCourses:e.courses,allSelectedLeadStages:e.leadStages,allSelectedObjectives:e.callObjectives,allSelectedNextActions:e.nextActions};return{name:e.metaProspect?`Live Call - ${e.metaProspect}`:"Live Sales Call Record",id:generateUUID(),createdAt:t,createdBySource:"APPLICATION",createdByWorkspaceMemberId:null,createdByName:e.metaCaller||"Sales Representative",createdByContext:ae,deletedAt:null,position:1,searchVector:null,updatedAt:t,updatedBySource:"APPLICATION",updatedByWorkspaceMemberId:null,updatedByName:e.metaCaller||"Sales Representative",updatedByContext:ae,caller:e.metaCaller||null,date:e.metaDatetime?e.metaDatetime.slice(0,10):t.slice(0,10),prospect:e.metaProspect||null,contactInfo:e.metaContact||null,callSource:e.metaSource||null,callAttempt:CALL_ATTEMPT_MAP[e.metaAttempt]||"OPT1ST_ATTEMPT",coursePitched:de,leadStage:pe,callObjective:he,roleExperienceBlocknote:toBlocknote(a),roleExperienceMarkdown:a,skillToolingLevelBlocknote:toBlocknote(n),skillToolingLevelMarkdown:n,companyIndustryBlocknote:toBlocknote(i),companyIndustryMarkdown:i,statedPainInterestBlocknote:toBlocknote(c),statedPainInterestMarkdown:c,timelineUrgencyBlocknote:toBlocknote(g),timelineUrgencyMarkdown:g,initialHypothesisBlocknote:toBlocknote(e.hypoInitial),initialHypothesisMarkdown:toMarkdown(e.hypoInitial),evidenceForHypothesisBlocknote:toBlocknote(e.hypoEvidence),evidenceForHypothesisMarkdown:toMarkdown(e.hypoEvidence),whatIStillDoNotKnowBlocknote:toBlocknote(e.hypoUnknown),whatIStillDoNotKnowMarkdown:toMarkdown(e.hypoUnknown),beforeTheCall5PreparedProbeQuestionsBlocknote:toBlocknote(I),beforeTheCall5PreparedProbeQuestionsMarkdown:I,duringCallQuestionAskedBlocknote:toBlocknote(J),duringCallQuestionAskedMarkdown:J,duringCallProspectSExactResponseBlocknote:toBlocknote(q),duringCallProspectSExactResponseMarkdown:q,duringCallSignalsDetectedBlocknote:toBlocknote(z),duringCallSignalsDetectedMarkdown:z,duringCallImmediateFollowUpBlocknote:toBlocknote(X),duringCallImmediateFollowUpMarkdown:X,duringTheCallWhatIThoughtBeforeCallBlocknote:toBlocknote(e.synthInitial),duringTheCallWhatIThoughtBeforeCallMarkdown:toMarkdown(e.synthInitial),duringTheCallWhatIDiscoveredDuringCallBlocknote:toBlocknote(e.synthNew),duringTheCallWhatIDiscoveredDuringCallMarkdown:toMarkdown(e.synthNew),duringTheCallFinalValidatedMotiveBlocknote:toBlocknote(e.synthFinal),duringTheCallFinalValidatedMotiveMarkdown:toMarkdown(e.synthFinal),duringTheCallConfidenceLevelInMotive:CONFIDENCE_MAP[e.confidence]||null,duringTheCallFitDecision:FIT_DECISION_MAP[e.fitDecision]||null,duringCallEvidenceForFitBlocknote:toBlocknote(e.fitEvidence),duringCallEvidenceForFitMarkdown:toMarkdown(e.fitEvidence),duringTheCallHookBlocknote:toBlocknote(e.pitch1),duringTheCallHookMarkdown:toMarkdown(e.pitch1),duringTheCallPainValidationBlocknote:toBlocknote(e.pitch2),duringTheCallPainValidationMarkdown:toMarkdown(e.pitch2),riskOfInactionBlocknote:toBlocknote(e.pitch3),riskOfInactionMarkdown:toMarkdown(e.pitch3),duringTheCallSolutionVisionBlocknote:toBlocknote(e.pitch4),duringTheCallSolutionVisionMarkdown:toMarkdown(e.pitch4),duringTheCallWhyThisTrainingBlocknote:toBlocknote(e.pitch5),duringTheCallWhyThisTrainingMarkdown:toMarkdown(e.pitch5),duringTheCallPracticalRelevanceBlocknote:toBlocknote(e.pitch6),duringTheCallPracticalRelevanceMarkdown:toMarkdown(e.pitch6),duringTheCallCallToActionBlocknote:toBlocknote(e.pitch7),duringTheCallCallToActionMarkdown:toMarkdown(e.pitch7),duringTheCallProspectResponseToPitchBlocknote:toBlocknote(e.pitchProspectResponse),duringTheCallProspectResponseToPitchMarkdown:toMarkdown(e.pitchProspectResponse),duringTheCallCloseAttempted:CLOSE_ATTEMPTED_MAP[e.closeAttempted]||null,duringTheCallDecisionAtPitch:DECISION_AT_PITCH_MAP[e.pitchDecision]||null,duringTheCallObjectionsLogBlocknote:toBlocknote(Z),duringTheCallObjectionsLogMarkdown:Z,duringTheCallPrimaryObjectionCategory:PRIMARY_OBJECTION_MAP[e.objCategory]||null,afterTheCallFinalCallOutcome:FINAL_OUTCOME_MAP[e.finalOutcome]||null,afterTheCallNextActionRequired:ue,afterTheCallActionOwnershipDueDateBlocknote:toBlocknote(ee),afterTheCallActionOwnershipDueDateMarkdown:ee,afterTheCallCollateralProofNeededBlocknote:toBlocknote(e.objEvidenceNeeded),afterTheCallCollateralProofNeededMarkdown:toMarkdown(e.objEvidenceNeeded),afterTheCallBuyingMotiveBlocknote:toBlocknote(e.learnings[0]),afterTheCallBuyingMotiveMarkdown:toMarkdown(e.learnings[0]),afterTheCallMostEffectiveProbeBlocknote:toBlocknote(e.learnings[1]),afterTheCallMostEffectiveProbeMarkdown:toMarkdown(e.learnings[1]),afterTheCallWorstAssumptionIMadeBlocknote:toBlocknote(e.learnings[2]),afterTheCallWorstAssumptionIMadeMarkdown:toMarkdown(e.learnings[2]),afterTheCallObjectionIWasUnpreparedForBlocknote:toBlocknote(e.learnings[3]),afterTheCallObjectionIWasUnpreparedForMarkdown:toMarkdown(e.learnings[3]),afterTheCallScriptQuestionToImproveBlocknote:toBlocknote(e.learnings[4]),afterTheCallScriptQuestionToImproveMarkdown:toMarkdown(e.learnings[4]),afterTheCallQualityReviewSignOffBlocknote:toBlocknote(te),afterTheCallQualityReviewSignOffMarkdown:te,readyForNextCall:READY_NEXT_CALL_MAP[e.readyNextCall]||null,afterTheCallReviewerNotesBlocknote:toBlocknote(e.reviewerNotes),afterTheCallReviewerNotesMarkdown:toMarkdown(e.reviewerNotes)}},M=()=>{
const checks = Array.isArray(e.mandatoryCheck) ? e.mandatoryCheck : [];
const qualityText = "Mandatory Checklist: " + checks.length + "/8 completed. Quality Score: " + (e.sheetQuality || "N/A") + "/5. Verified: " + checks.join(", ");
const timingText = formatDuration(N) + " (Prep: " + formatDuration(s[1]) + ", Live: " + formatDuration(s[2]) + ", Wrap: " + formatDuration(s[3]) + ")";
const probesArr = Array.isArray(e.probes) ? e.probes : [];
const probesMd = probesArr.map((p, idx) => "Probe " + (idx + 1) + ": " + (p.q || "") + " | Motive: " + (p.m || "") + " | Follow-up: " + (p.f || "")).join("\n");
const discQMd = [e.discQ1 ? "Q1: " + e.discQ1 : "", e.discQ2 ? "Q2: " + e.discQ2 : "", e.discQ3 ? "Q3: " + e.discQ3 : ""].filter(Boolean).join("\n");
const discAnsMd = [e.discAns1 ? "Ans 1: " + e.discAns1 : "", e.discAns2 ? "Ans 2: " + e.discAns2 : "", e.discAns3 ? "Ans 3: " + e.discAns3 : ""].filter(Boolean).join("\n");
const s1 = Array.isArray(e.sig1) ? e.sig1 : [];
const s2 = Array.isArray(e.sig2) ? e.sig2 : [];
const sigsMd = [s1.length ? "Q1 Signals: " + s1.join(", ") : "", s2.length ? "Q2 Signals: " + s2.join(", ") : ""].filter(Boolean).join(" | ");
const discFMd = [e.discF1 ? "Follow-up 1: " + e.discF1 : "", e.discF2 ? "Follow-up 2: " + e.discF2 : "", e.discF3 ? "Follow-up 3: " + e.discF3 : ""].filter(Boolean).join("\n");
const objArr = Array.isArray(e.objections) ? e.objections : [];
const objMd = objArr.map((o, idx) => "Obj " + (idx + 1) + ": " + (o.exact || "") + " | Root: " + (o.cause || "") + " | Response: " + (o.resp || "") + " | Resolved: " + (o.res || "")).join("\n");
const nActions = Array.isArray(e.nextActions) ? e.nextActions : [];
const learningsArr = Array.isArray(e.learnings) ? e.learnings : [];
const coursesArr = Array.isArray(e.courses) ? e.courses : [];
const leadStagesArr = Array.isArray(e.leadStages) ? e.leadStages : [];
const callObjectivesArr = Array.isArray(e.callObjectives) ? e.callObjectives : [];

return {
  name: (e.metaProspect || "Untitled Prospect") + " - " + extractDateOnly(e.metaDatetime),
  caller: e.metaCaller || "Sales Rep",
  date: extractDateOnly(e.metaDatetime),
  prospect: e.metaProspect || "",
  contactInfo: e.metaContact || "",
  callSource: e.metaSource || "",
  callAttempt: CALL_ATTEMPT_MAP[e.metaAttempt] || "OPT1ST_ATTEMPT",
  coursePitched: COURSE_PITCHED_MAP[coursesArr[0]] || (coursesArr.length > 0 ? "PRO_CODE_AGENTIC_DEVELOPMENT" : null),
  leadStage: LEAD_STAGE_MAP[leadStagesArr[0]] || null,
  callObjective: CALL_OBJECTIVE_MAP[callObjectivesArr[0]] || null,
  totalCallTiming: timingText,
  roleExperience: { markdown: ("Level/Role: " + (e.targetRoleKnow || "") + "\nWhy: " + (e.targetRoleWhy || "")).trim() },
  skillToolingLevel: { markdown: ("Current: " + (e.targetSkillKnow || "") + "\nWhy: " + (e.targetSkillWhy || "")).trim() },
  companyIndustry: { markdown: ("Context: " + (e.targetCompanyKnow || "") + "\nWhy: " + (e.targetCompanyWhy || "")).trim() },
  statedPainInterest: { markdown: ("Pain: " + (e.targetPainKnow || "") + "\nWhy: " + (e.targetPainWhy || "")).trim() },
  timelineUrgency: { markdown: ("Timeline: " + (e.targetUrgencyKnow || "") + "\nWhy: " + (e.targetUrgencyWhy || "")).trim() },
  initialHypothesis: { markdown: e.hypoInitial || "" },
  evidenceForHypothesis: { markdown: e.hypoEvidence || "" },
  whatIStillDoNotKnow: { markdown: e.hypoUnknown || "" },
  beforeTheCall5PreparedProbeQuestions: { markdown: probesMd },
  duringCallQuestionAsked: { markdown: discQMd },
  duringCallProspectSExactResponse: { markdown: discAnsMd },
  duringCallSignalsDetected: { markdown: sigsMd },
  duringCallImmediateFollowUp: { markdown: discFMd },
  duringTheCallWhatIThoughtBeforeCall: { markdown: e.synthInitial || "" },
  duringTheCallWhatIDiscoveredDuringCall: { markdown: e.synthNew || "" },
  duringTheCallFinalValidatedMotive: { markdown: e.synthFinal || "" },
  duringTheCallConfidenceLevelInMotive: CONFIDENCE_MAP[e.confidence] || null,
  duringTheCallFitDecision: FIT_DECISION_MAP[e.fitDecision] || null,
  duringCallEvidenceForFit: { markdown: e.fitEvidence || "" },
  duringTheCallHook: { markdown: e.pitch1 || "" },
  duringTheCallPainValidation: { markdown: e.pitch2 || "" },
  riskOfInaction: { markdown: e.pitch3 || "" },
  duringTheCallSolutionVision: { markdown: e.pitch4 || "" },
  duringTheCallWhyThisTraining: { markdown: e.pitch5 || "" },
  duringTheCallPracticalRelevance: { markdown: e.pitch6 || "" },
  duringTheCallCallToAction: { markdown: e.pitch7 || "" },
  duringTheCallProspectResponseToPitch: { markdown: e.pitchProspectResponse || "" },
  duringTheCallCloseAttempted: CLOSE_ATTEMPTED_MAP[e.closeAttempted] || null,
  duringTheCallDecisionAtPitch: DECISION_AT_PITCH_MAP[e.pitchDecision] || null,
  duringTheCallObjectionsLog: { markdown: objMd },
  duringTheCallPrimaryObjectionCategory: PRIMARY_OBJECTION_MAP[e.objCategory] || null,
  afterTheCallFinalCallOutcome: FINAL_OUTCOME_MAP[e.finalOutcome] || null,
  afterTheCallNextActionRequired: NEXT_ACTION_MAP[nActions[0]] || null,
  afterTheCallActionOwnershipDueDate: { markdown: "Actions: " + nActions.join(", ") + " | Owner: " + (e.actionOwner || "") + " | Due: " + (e.actionDueDate || "") + " | Collateral: " + (e.objEvidenceNeeded || "") },
  afterTheCallCollateralProofNeeded: { markdown: e.objEvidenceNeeded || "" },
  afterTheCallBuyingMotive: { markdown: learningsArr[0] || "" },
  afterTheCallMostEffectiveProbe: { markdown: learningsArr[1] || "" },
  afterTheCallWorstAssumptionIMade: { markdown: learningsArr[2] || "" },
  afterTheCallObjectionIWasUnpreparedFor: { markdown: learningsArr[3] || "" },
  afterTheCallScriptQuestionToImprove: { markdown: learningsArr[4] || "" },
  afterTheCallQualityReviewSignOff: { markdown: qualityText },
  readyForNextCall: READY_NEXT_CALL_MAP[e.readyNextCall] || null,
  afterTheCallReviewerNotes: { markdown: e.reviewerNotes || "" }
};
},x=async()=>{
  W(!0);
  P(null);
  u(!1);
  const t = normalizeNebulaUrl(C);
  try {
    const a = M();
    const n = await fetch(t, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${w.trim()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(a)
    });
    const i = await n.json().catch(() => null);
    if (n.status === 201 || (n.ok && i?.data)) {
      const g = (i?.data?.createLiveCallSheet || i?.data)?.id || "ID-" + Math.floor(1e5 + Math.random() * 9e5);
      oe(g);
      le(i);
      const newHistItem = {
        id: g,
        timestamp: new Date().toISOString(),
        prospect: e.metaProspect || "Untitled Prospect",
        caller: e.metaCaller || "Sales Rep",
        date: extractDateOnly(e.metaDatetime) || new Date().toISOString().slice(0, 10),
        duration: formatDuration(N),
        stageTimes: { ...s },
        outcome: e.finalOutcome || "Submitted",
        courses: Array.isArray(e.courses) ? [...e.courses] : [],
        leadStages: Array.isArray(e.leadStages) ? [...e.leadStages] : [],
        callObjectives: Array.isArray(e.callObjectives) ? [...e.callObjectives] : [],
        contactInfo: e.metaContact || "",
        callSource: e.metaSource || "",
        callAttempt: e.metaAttempt || "1st Attempt",
        fitDecision: e.fitDecision || "",
        validatedMotive: e.synthFinal || "",
        nextActions: Array.isArray(e.nextActions) ? [...e.nextActions] : [],
        actionOwner: e.actionOwner || "",
        actionDueDate: e.actionDueDate || "",
        formData: { ...e },
        payload: a
      };
      setHistory(prev => {
        const up = [newHistItem, ...prev];
        try { localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(up)); } catch (err) {}
        return up;
      });
      p(initialFormData);
      S({ 1: 0, 2: 0, 3: 0 });
      r(1);
      u(!1);
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TIMER_STORAGE_KEY);
      } catch (err) {}
      setCurrentView("dashboard");
      window.scrollTo({ top: 0, behavior: "smooth" });
      h(`🎉 Call submitted to Nebula CRM (ID: ${g}) & logged to Records!`);
    } else {
      const c = Array.isArray(i?.messages) ? i.messages.join("; ") : i?.error || `HTTP ${n.status}: ${n.statusText}`;
      P(c);
      p(g => ({ ...g, nebulaSyncStatus: "Error" }));
      h(`⚠️ Nebula Error: ${c}`);
    }
  } catch (n) {
    console.error("Nebula Sync Error:", n);
    const i = n.message || "Network request failed";
    P(i);
    p(c => ({ ...c, nebulaSyncStatus: "Error" }));
    h(`❌ Failed to connect: ${i}`);
  } finally {
    W(!1);
  }
},K=()=>{const t=`
=== NEBULA CRM CALL RECORD ===
Record ID: ${b||"Pending Sync"}
Prospect: ${e.metaProspect||"N/A"}
Contact: ${e.metaContact||"N/A"}
Caller: ${e.metaCaller||"N/A"}
Call Date: ${formatDisplayDateTime(e.metaDatetime)}
Stage Durations:
  - Before Call Prep: ${formatDuration(s[1])}
  - Live Call Duration: ${formatDuration(s[2])}
  - Post-Call Wrap Up: ${formatDuration(s[3])}
  - Total Call Time: ${formatDuration(N)}

Course: ${e.courses.join(", ")||"N/A"}
Fit Decision: ${e.fitDecision||"N/A"}
Validated Motive: ${e.synthFinal||"N/A"}
Final Outcome: ${e.finalOutcome||"Pending"}
Next Actions: ${e.nextActions.join(", ")||"None"} (Owner: ${e.actionOwner||"N/A"}, Due: ${formatDisplayDateTime(e.actionDueDate)})
Primary Objection: ${e.objPattern||"None"}
==============================
    `.trim();navigator.clipboard.writeText(t).then(()=>{h("\u{1F4CB} CRM Summary copied to clipboard!")}).catch(()=>{alert(t)})},k=useMemo(()=>{let t=0;return(e.hypoInitial||"").trim().length>5&&t++,e.probes.every(a=>a.q.trim().length>0)&&t++,((e.discAns1||"").trim().length>3||(e.discAns2||"").trim().length>3)&&t++,(e.synthFinal||"").trim().length>3&&t++,(e.pitch1||"").trim().length>5&&t++,(e.objections.some(a=>a.exact.trim().length>0)||e.objCategory)&&t++,e.finalOutcome&&t++,e.nextActions.length>0&&t++,t},[e]),V=Math.round(k/8*100);return React.createElement("div", null,
  React.createElement("header", { className: "top-action-bar no-print" },
    React.createElement("div", { className: "top-bar-left" },
      React.createElement("div", { className: "brand-title" },
        React.createElement("span", { className: "brand-icon" }, "📞"),
        React.createElement("span", { className: "brand-name" }, "Sales Mastery Suite")
      ),
      React.createElement("nav", { className: "view-nav-tabs" },
        React.createElement("button", {
          type: "button",
          className: `view-tab-btn ${currentView === "dashboard" ? "active" : ""}`,
          onClick: () => { setCurrentView("dashboard"); window.scrollTo({ top: 0, behavior: "smooth" }); },
          title: "View submitted call records & analytics"
        },
          React.createElement("span", null, "📊"),
          React.createElement("span", null, "Records & Analytics"),
          history.length > 0 && React.createElement("span", { className: "tab-count-pill" }, history.length)
        ),
        React.createElement("button", {
          type: "button",
          className: `view-tab-btn ${currentView === "sheet" ? "active" : ""}`,
          onClick: () => { setCurrentView("sheet"); window.scrollTo({ top: 0, behavior: "smooth" }); },
          title: "Switch to live call worksheet"
        },
          React.createElement("span", null, "📝"),
          React.createElement("span", null, "Live Call Sheet")
        )
      )
    ),
    currentView === "sheet" ? (
      React.createElement("div", { className: "stage-nav-pill-container" },
        React.createElement("button", { type: "button", className: `stage-pill-btn ${l === 1 ? "active" : ""} ${s[1] > 0 ? "visited" : ""}`, onClick: () => r(1) },
          React.createElement("span", { className: "stage-num" }, "1"),
          React.createElement("span", { className: "stage-name" }, "Before Call"),
          React.createElement("span", { className: "stage-sub-timer" }, formatDuration(s[1]))
        ),
        React.createElement("span", { className: "stage-connector" }, "➔"),
        React.createElement("button", { type: "button", className: `stage-pill-btn ${l === 2 ? "active" : ""} ${s[2] > 0 ? "visited" : ""}`, onClick: () => r(2) },
          React.createElement("span", { className: "stage-num" }, "2"),
          React.createElement("span", { className: "stage-name" }, "During Call"),
          React.createElement("span", { className: "stage-sub-timer" }, formatDuration(s[2]))
        ),
        React.createElement("span", { className: "stage-connector" }, "➔"),
        React.createElement("button", { type: "button", className: `stage-pill-btn ${l === 3 ? "active" : ""} ${s[3] > 0 ? "visited" : ""}`, onClick: () => r(3) },
          React.createElement("span", { className: "stage-num" }, "3"),
          React.createElement("span", { className: "stage-name" }, "After Call"),
          React.createElement("span", { className: "stage-sub-timer" }, formatDuration(s[3]))
        )
      )
    ) : (
      React.createElement("div", { className: "dashboard-quick-stats" },
        React.createElement("span", { className: "stats-pill" }, `Total Calls: ${history.length}`),
        React.createElement("span", { className: "stats-pill won" }, `Win Rate: ${analytics.wonRate}%`),
        React.createElement("span", { className: "stats-pill follow" }, `Pipeline: ${analytics.followUps}`)
      )
    ),
    React.createElement("div", { className: "actions" },
      currentView === "sheet" ? (
        React.createElement(React.Fragment, null,
          React.createElement("div", { className: `combined-timer-pill ${d ? "running" : ""}`, title: "Total Call Timer" },
            React.createElement("span", { className: `pulse-dot ${d ? "running" : ""}` }),
            React.createElement("span", { className: "combined-label" }, "Total:"),
            React.createElement("span", { className: "combined-value" }, formatDuration(N)),
            React.createElement("button", { type: "button", className: "timer-btn-inline", onClick: G, title: d ? "Pause Timers" : "Resume Timers" }, d ? "⏸️" : "▶️"),
            React.createElement("button", { type: "button", className: "timer-btn-inline", onClick: H, title: "Reset All Timers" }, "↺")
          ),
          React.createElement("button", { className: "btn btn-secondary", onClick: ce, title: "Fill sample enterprise call data" }, "✨ Sample Data"),
          React.createElement("button", { className: "btn btn-nebula", onClick: () => T(true), title: "Nebula CRM Settings & Schema" }, "🌌 Nebula CRM", e.nebulaSyncStatus.startsWith("Synced") && React.createElement("span", { className: "sync-badge-mini" }, "✓")),
          React.createElement("button", { className: "btn btn-secondary", onClick: () => window.print(), title: "Print Call Sheet or Save PDF" }, "🖨️ Print"),
          React.createElement("button", { className: "btn btn-outline-danger", onClick: re, title: "Reset Worksheet" }, "🧹 Reset")
        )
      ) : (
        React.createElement(React.Fragment, null,
          React.createElement("button", {
            className: "btn btn-primary btn-start-call",
            onClick: startNewCallSheet,
            title: "Start a new live sales call sheet"
          }, "➕ Start New Live Call"),
          React.createElement("button", {
            className: "btn btn-secondary",
            onClick: loadDemoHistory,
            title: "Load demo enterprise call records into analytics"
          }, "✨ Load Demo Records"),
          React.createElement("button", {
            className: "btn btn-nebula",
            onClick: () => T(true),
            title: "Nebula CRM Settings & Schema"
          }, "🌌 Nebula CRM")
        )
      )
    )
  ),
  React.createElement("main", { className: "document-container" },
    currentView === "dashboard" ? (
      React.createElement("div", { className: "dashboard-container fade-in" },
        React.createElement("div", { className: "dashboard-hero" },
          React.createElement("div", { className: "dashboard-hero-text" },
            React.createElement("h1", { className: "dashboard-title" }, "Sales Call Intelligence & Records"),
            React.createElement("p", { className: "dashboard-subtitle" },
              "Pre-call preparation records, verbatim discovery transcripts, objection telemetry, and Nebula CRM sync history."
            )
          ),
          React.createElement("div", { className: "dashboard-hero-actions" },
            React.createElement("button", {
              className: "btn btn-primary btn-lg",
              onClick: startNewCallSheet
            }, "➕ Start New Live Call"),
            React.createElement("button", {
              className: "btn btn-secondary",
              onClick: loadDemoHistory
            }, "✨ Demo Records"),
            history.length > 0 && React.createElement("button", {
              className: "btn btn-outline-danger",
              onClick: clearAllHistory
            }, "🗑️ Clear All")
          )
        ),
        React.createElement("div", { className: "analytics-grid" },
          React.createElement("div", { className: "analytic-card" },
            React.createElement("div", { className: "analytic-header" },
              React.createElement("span", { className: "analytic-icon blue" }, "📞"),
              React.createElement("span", { className: "analytic-tag" }, "All Calls")
            ),
            React.createElement("div", { className: "analytic-value" }, analytics.total),
            React.createElement("div", { className: "analytic-label" }, "Total Calls Logged"),
            React.createElement("div", { className: "analytic-footer" },
              React.createElement("span", { className: "analytic-subtext" }, `${analytics.won} won · ${analytics.followUps} pipeline`)
            )
          ),
          React.createElement("div", { className: "analytic-card" },
            React.createElement("div", { className: "analytic-header" },
              React.createElement("span", { className: "analytic-icon emerald" }, "🏆"),
              React.createElement("span", { className: "analytic-tag success" }, `${analytics.won} Enrolled`)
            ),
            React.createElement("div", { className: "analytic-value text-emerald" }, `${analytics.wonRate}%`),
            React.createElement("div", { className: "analytic-label" }, "Win / Enrollment Rate"),
            React.createElement("div", { className: "analytic-footer" },
              React.createElement("div", { className: "mini-progress-bar" },
                React.createElement("div", { className: "mini-progress-fill success", style: { width: `${analytics.wonRate}%` } })
              )
            )
          ),
          React.createElement("div", { className: "analytic-card" },
            React.createElement("div", { className: "analytic-header" },
              React.createElement("span", { className: "analytic-icon amber" }, "⏳"),
              React.createElement("span", { className: "analytic-tag warning" }, "In Flight")
            ),
            React.createElement("div", { className: "analytic-value text-amber" }, analytics.followUps),
            React.createElement("div", { className: "analytic-label" }, "Follow-ups Scheduled"),
            React.createElement("div", { className: "analytic-footer" },
              React.createElement("span", { className: "analytic-subtext" }, "Active commitments in pipeline")
            )
          ),
          React.createElement("div", { className: "analytic-card" },
            React.createElement("div", { className: "analytic-header" },
              React.createElement("span", { className: "analytic-icon indigo" }, "🎯"),
              React.createElement("span", { className: "analytic-tag purple" }, "Fit Check")
            ),
            React.createElement("div", { className: "analytic-value text-indigo" }, `${analytics.fitRate}%`),
            React.createElement("div", { className: "analytic-label" }, "Qualified Fit Rate"),
            React.createElement("div", { className: "analytic-footer" },
              React.createElement("div", { className: "mini-progress-bar" },
                React.createElement("div", { className: "mini-progress-fill indigo", style: { width: `${analytics.fitRate}%` } })
              )
            )
          ),
          React.createElement("div", { className: "analytic-card" },
            React.createElement("div", { className: "analytic-header" },
              React.createElement("span", { className: "analytic-icon rose" }, "⏱️"),
              React.createElement("span", { className: "analytic-tag info" }, "Avg / Call")
            ),
            React.createElement("div", { className: "analytic-value" }, analytics.avgDuration),
            React.createElement("div", { className: "analytic-label" }, "Average Call Duration"),
            React.createElement("div", { className: "analytic-footer" },
              React.createElement("span", { className: "analytic-subtext" }, `Total: ${formatDuration(analytics.totalDurationSec)} logged`)
            )
          )
        ),
        React.createElement("div", { className: "records-toolbar" },
          React.createElement("div", { className: "records-search-wrap" },
            React.createElement("span", { className: "search-icon" }, "🔍"),
            React.createElement("input", {
              type: "text",
              className: "records-search-input",
              placeholder: "Search prospect, caller, contact, course, or verified motive...",
              value: searchQuery,
              onChange: (ev) => setSearchQuery(ev.target.value)
            }),
            searchQuery && React.createElement("button", {
              type: "button",
              className: "search-clear-btn",
              onClick: () => setSearchQuery("")
            }, "×")
          ),
          React.createElement("div", { className: "records-filters-row" },
            React.createElement("select", {
              className: "filter-select",
              value: filterOutcome,
              onChange: (ev) => setFilterOutcome(ev.target.value)
            },
              React.createElement("option", { value: "ALL" }, "All Outcomes"),
              React.createElement("option", { value: "WON" }, "🏆 Won / Enrolled"),
              React.createElement("option", { value: "FOLLOW_UP" }, "⏳ Follow-up Scheduled"),
              React.createElement("option", { value: "LOST" }, "❌ Lost"),
              React.createElement("option", { value: "DISQUALIFIED" }, "🚫 Disqualified")
            ),
            React.createElement("select", {
              className: "filter-select",
              value: filterCourse,
              onChange: (ev) => setFilterCourse(ev.target.value)
            },
              React.createElement("option", { value: "ALL" }, "All Courses"),
              React.createElement("option", { value: "Pro Code Agentic Development" }, "Pro Code Agentic Development"),
              React.createElement("option", { value: "No Code Agentic Development" }, "No Code Agentic Development"),
              React.createElement("option", { value: "AI Engineering" }, "AI Engineering"),
              React.createElement("option", { value: "ML Engineering" }, "ML Engineering"),
              React.createElement("option", { value: "Python Programming" }, "Python Programming"),
              React.createElement("option", { value: "Full Stack Development" }, "Full Stack Development")
            ),
            (searchQuery || filterOutcome !== "ALL" || filterCourse !== "ALL") && React.createElement("button", {
              type: "button",
              className: "btn-reset-filters",
              onClick: () => { setSearchQuery(""); setFilterOutcome("ALL"); setFilterCourse("ALL"); }
            }, "Reset Filters"),
            React.createElement("span", { className: "records-counter" },
              `Showing ${filteredHistory.length} of ${history.length} records`
            )
          )
        ),
        filteredHistory.length === 0 ? (
          React.createElement("div", { className: "records-empty-card" },
            React.createElement("div", { className: "records-empty-icon" }, history.length === 0 ? "📭" : "🔍"),
            React.createElement("h3", { className: "records-empty-title" },
              history.length === 0 ? "No Call Records Submitted Yet" : "No Matching Call Records Found"
            ),
            React.createElement("p", { className: "records-empty-desc" },
              history.length === 0
                ? "Start a live call sheet to track prep, verbatim discovery, and submit to Nebula CRM, or load realistic demo records to test the dashboard."
                : "Try adjusting your search terms or filters above to view other call records."
            ),
            React.createElement("div", { className: "records-empty-actions" },
              history.length === 0
                ? React.createElement(React.Fragment, null,
                    React.createElement("button", {
                      className: "btn btn-primary",
                      onClick: startNewCallSheet
                    }, "➕ Start First Live Call"),
                    React.createElement("button", {
                      className: "btn btn-secondary",
                      onClick: loadDemoHistory
                    }, "✨ Load Demo Records")
                  )
                : React.createElement("button", {
                    className: "btn btn-secondary",
                    onClick: () => { setSearchQuery(""); setFilterOutcome("ALL"); setFilterCourse("ALL"); }
                  }, "Clear Filters")
            )
          )
        ) : (
          React.createElement("div", { className: "table-responsive-wrap" },
            React.createElement("table", { className: "records-table" },
              React.createElement("thead", null,
                React.createElement("tr", null,
                  React.createElement("th", { style: { width: "20%" } }, "Prospect & Contact"),
                  React.createElement("th", { style: { width: "13%" } }, "Caller & Date"),
                  React.createElement("th", { style: { width: "16%" } }, "Course & Intent"),
                  React.createElement("th", { style: { width: "12%" } }, "Call Timing"),
                  React.createElement("th", { style: { width: "13%" } }, "Final Outcome"),
                  React.createElement("th", { style: { width: "14%" } }, "Fit & Motive"),
                  React.createElement("th", { style: { width: "12%" } }, "Actions")
                )
              ),
              React.createElement("tbody", null,
                filteredHistory.map((item, idx) => {
                  const courseList = item.courses || item.formData?.courses || [];
                  const primaryCourse = courseList[0] || "General Sales";
                  const outcomeStr = item.outcome || item.formData?.finalOutcome || "Submitted";
                  let outcomeClass = "outcome-pill-submitted";
                  if (outcomeStr.includes("Won") || outcomeStr.includes("enrolled")) outcomeClass = "outcome-pill-won";
                  else if (outcomeStr.includes("Follow-up") || outcomeStr.includes("followup")) outcomeClass = "outcome-pill-followup";
                  else if (outcomeStr.includes("Lost")) outcomeClass = "outcome-pill-lost";
                  else if (outcomeStr.includes("Disqualified")) outcomeClass = "outcome-pill-disqualified";

                  const fitStr = item.fitDecision || item.formData?.fitDecision || "";
                  const motiveStr = item.validatedMotive || item.formData?.synthFinal || "";
                  const prepSec = item.stageTimes?.[1] || 0;
                  const liveSec = item.stageTimes?.[2] || 0;
                  const postSec = item.stageTimes?.[3] || 0;

                  return React.createElement("tr", { key: item.id || idx, className: "record-row" },
                    React.createElement("td", null,
                      React.createElement("div", { className: "record-prospect-cell" },
                        React.createElement("div", { className: "record-avatar" }, (item.prospect || "U")[0].toUpperCase()),
                        React.createElement("div", { className: "record-prospect-info" },
                          React.createElement("span", { className: "record-prospect-name" }, item.prospect || "Untitled Prospect"),
                          React.createElement("span", { className: "record-contact-text" }, item.contactInfo || item.formData?.metaContact || "No contact info"),
                          (item.callSource || item.formData?.metaSource) && React.createElement("span", { className: "record-source-tag" }, item.callSource || item.formData?.metaSource)
                        )
                      )
                    ),
                    React.createElement("td", null,
                      React.createElement("div", { className: "record-cell-stacked" },
                        React.createElement("span", { className: "record-caller-name" }, "👤 " + (item.caller || item.formData?.metaCaller || "Sales Rep")),
                        React.createElement("span", { className: "record-date-text" }, "📅 " + (item.date || "N/A")),
                        React.createElement("span", { className: "record-attempt-tag" }, item.callAttempt || item.formData?.metaAttempt || "1st Attempt")
                      )
                    ),
                    React.createElement("td", null,
                      React.createElement("div", { className: "record-cell-stacked" },
                        React.createElement("span", { className: "record-course-badge" }, primaryCourse),
                        (item.formData?.leadStages?.[0] || item.leadStages?.[0]) && React.createElement("span", { className: "record-sub-tag" }, "🎯 " + (item.formData?.leadStages?.[0] || item.leadStages?.[0])),
                        (item.formData?.callObjectives?.[0] || item.callObjectives?.[0]) && React.createElement("span", { className: "record-sub-tag" }, "📌 " + (item.formData?.callObjectives?.[0] || item.callObjectives?.[0]))
                      )
                    ),
                    React.createElement("td", null,
                      React.createElement("div", { className: "record-cell-stacked" },
                        React.createElement("span", { className: "record-time-badge" }, "⏱️ " + (item.duration || formatDuration(prepSec + liveSec + postSec))),
                        React.createElement("span", { className: "record-timing-breakdown", title: `Prep: ${formatDuration(prepSec)}, Live: ${formatDuration(liveSec)}, Post: ${formatDuration(postSec)}` },
                          `P:${Math.floor(prepSec/60)}m · L:${Math.floor(liveSec/60)}m · W:${Math.floor(postSec/60)}m`
                        )
                      )
                    ),
                    React.createElement("td", null,
                      React.createElement("div", { className: "record-cell-stacked" },
                        React.createElement("span", { className: `outcome-pill ${outcomeClass}` }, outcomeStr),
                        (item.nextActions?.length > 0 || item.formData?.nextActions?.length > 0) && React.createElement("span", { className: "record-next-action-text" },
                          "➡️ " + ((item.nextActions || item.formData?.nextActions || []).slice(0, 1).join(""))
                        ),
                        (item.actionDueDate || item.formData?.actionDueDate) && React.createElement("span", { className: "record-due-text" },
                          "Due: " + formatDisplayDateTime(item.actionDueDate || item.formData?.actionDueDate)
                        )
                      )
                    ),
                    React.createElement("td", null,
                      React.createElement("div", { className: "record-cell-stacked" },
                        fitStr && React.createElement("span", { className: `fit-pill ${fitStr.includes("Strong") ? "fit-strong" : fitStr.includes("Moderate") ? "fit-moderate" : "fit-none"}` }, fitStr),
                        motiveStr ? React.createElement("p", { className: "record-motive-text", title: motiveStr }, motiveStr) : React.createElement("span", { className: "record-muted" }, "No motive recorded")
                      )
                    ),
                    React.createElement("td", null,
                      React.createElement("div", { className: "record-actions-cell" },
                        React.createElement("button", {
                          type: "button",
                          className: "btn-table-action primary",
                          onClick: () => loadHistoryIntoSheet(item),
                          title: "Load into live worksheet"
                        }, "🔄 Open"),
                        React.createElement("button", {
                          type: "button",
                          className: "btn-table-action",
                          onClick: () => {
                            navigator.clipboard.writeText(JSON.stringify(item.payload || item.formData, null, 2));
                            h("📋 Complete JSON payload copied to clipboard!");
                          },
                          title: "Copy JSON Payload"
                        }, "📋 JSON"),
                        React.createElement("button", {
                          type: "button",
                          className: "btn-table-action danger",
                          onClick: () => deleteHistoryItem(item.id),
                          title: "Delete this record"
                        }, "🗑️")
                      )
                    )
                  );
                })
              )
            )
          )
        )
      )
    ) : (
      React.createElement(React.Fragment, null,
React.createElement("div",{className:"tracker-box no-print"},React.createElement("div",{className:"tracker-status"},React.createElement("strong",null,"Mandatory Call Rule Progress:"),React.createElement("span",{style:{color:k===8?"#16a34a":"#2563eb",fontWeight:700}},k===8?"\u{1F389} All 8 Mandatory Requirements Completed!":`${k} / 8 Key Requirements Met (${V}%)`)),React.createElement("div",{className:"progress-bar-wrap"},React.createElement("div",{className:"progress-bar-fill",style:{width:`${V}%`,backgroundColor:k===8?"#16a34a":"#2563eb"}}))),l===1&&React.createElement("div",{className:"stage-container fade-in"},React.createElement("section",{className:"sheet-page",id:"page-1"},React.createElement("div",{className:"page-header-row"},React.createElement("span",{className:"stage-badge-inline stage-1-badge"},"STAGE 1: BEFORE THE CALL"),React.createElement("span",null,"Page 1 of 7")),React.createElement("h1",{className:"sheet-title"},"Live Call Sheet Template"),React.createElement("p",{className:"sheet-subtitle"},"Stage 1: Fill the before-call preparation section before dialing the prospect."),React.createElement("div",{className:"rule-box completion"},React.createElement("div",{className:"rule-title"},"\u26A0\uFE0F Completion rule"),"No call should be marked complete unless this sheet has: target hypothesis, 5 prepared probes, exact prospect answers, updated buying motive, customized pitch angle, objection log, outcome, and next action."),React.createElement("div",{className:"rule-box guardrail"},React.createElement("div",{className:"rule-title"},"\u{1F6E1}\uFE0F Call guardrail"),"Never enter a live call without completing the Target Hypothesis and 5 Prepared Probes. Listen more than you speak in the first 10 minutes."),React.createElement("table",{className:"meta-grid-table"},React.createElement("tbody",null,React.createElement("tr",null,React.createElement("th",null,"Caller"),React.createElement("td",null,React.createElement("input",{type:"text",value:e.metaCaller,onChange:t=>o("metaCaller",t.target.value),placeholder:"Sales Rep Name"})),React.createElement("th",null,"Date / Time"),React.createElement("td",null,React.createElement("div",{className:"datetime-picker-wrap"},React.createElement("input",{type:"datetime-local",className:"datetime-input",value:e.metaDatetime,onChange:t=>o("metaDatetime",t.target.value)}),React.createElement("button",{type:"button",className:"btn-date-now",onClick:()=>{const t=new Date,a=i=>String(i).padStart(2,"0"),n=`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`;o("metaDatetime",n)},title:"Set to current date & time"},"\u26A1 Now"))),React.createElement("th",null,"Prospect"),React.createElement("td",null,React.createElement("input",{type:"text",value:e.metaProspect,onChange:t=>o("metaProspect",t.target.value),placeholder:"Full Name"}))),React.createElement("tr",null,React.createElement("th",null,"Contact Info"),React.createElement("td",null,React.createElement("input",{type:"text",value:e.metaContact,onChange:t=>o("metaContact",t.target.value),placeholder:"Email / Phone / LinkedIn"})),React.createElement("th",null,"Call Source"),React.createElement("td",null,React.createElement("input",{type:"text",value:e.metaSource,onChange:t=>o("metaSource",t.target.value),placeholder:"Inbound / LinkedIn / Ad"})),React.createElement("th",null,"Call Attempt"),React.createElement("td",null,React.createElement("select",{value:e.metaAttempt,onChange:t=>o("metaAttempt",t.target.value)},React.createElement("option",{value:"1st Attempt"},"1st Attempt"),React.createElement("option",{value:"2nd Attempt"},"2nd Attempt"),React.createElement("option",{value:"Follow-up"},"Follow-up"),React.createElement("option",{value:"Closing Call"},"Closing Call")))))),React.createElement("div",{className:"triple-section-grid"},React.createElement("div",{className:"triple-col"},React.createElement("div",{className:"triple-col-title"},"Course Pitched"),React.createElement("div",{className:"checkbox-group"},["Pro Code Agentic Development","No Code Agentic Development","AI Engineering","ML Engineering","Python Programming","Full Stack Development"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"checkbox",checked:e.courses.includes(t),onChange:()=>f("courses",t)}),React.createElement("span",null,t))))),React.createElement("div",{className:"triple-col"},React.createElement("div",{className:"triple-col-title"},"Lead Stage"),React.createElement("div",{className:"checkbox-group"},["Fresh lead","Follow-up","Re-engagement","Referral"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"checkbox",checked:e.leadStages.includes(t),onChange:()=>f("leadStages",t)}),React.createElement("span",null,t))))),React.createElement("div",{className:"triple-col"},React.createElement("div",{className:"triple-col-title"},"Call Objective"),React.createElement("div",{className:"checkbox-group"},["Qualify","Pitch","Close","Information only"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"checkbox",checked:e.callObjectives.includes(t),onChange:()=>f("callObjectives",t)}),React.createElement("span",null,t)))))),React.createElement("h2",{className:"section-title"},"Before the Call - Target Profile"),React.createElement("p",{className:"section-subtitle"},"Complete all rows before dialing."),React.createElement("table",{className:"table-sheet"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{style:{width:"22%"}},"Target Dimension"),React.createElement("th",{style:{width:"39%"}},"What I Know Before the Call"),React.createElement("th",{style:{width:"39%"}},"Why It Matters to This Call"))),React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"Role & Experience")),React.createElement("td",null,React.createElement("textarea",{value:e.targetRoleKnow,onChange:t=>o("targetRoleKnow",t.target.value),placeholder:"e.g. Senior Software Architect, 10 yrs exp..."})),React.createElement("td",null,React.createElement("textarea",{value:e.targetRoleWhy,onChange:t=>o("targetRoleWhy",t.target.value),placeholder:"e.g. High technical pride, values deep engineering over fluff..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"Skill & Tooling Level")),React.createElement("td",null,React.createElement("textarea",{value:e.targetSkillKnow,onChange:t=>o("targetSkillKnow",t.target.value),placeholder:"e.g. Python, Docker, zero LangGraph exp..."})),React.createElement("td",null,React.createElement("textarea",{value:e.targetSkillWhy,onChange:t=>o("targetSkillWhy",t.target.value),placeholder:"e.g. Avoid condescension, focus on enterprise agent patterns..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"Company & Industry")),React.createElement("td",null,React.createElement("textarea",{value:e.targetCompanyKnow,onChange:t=>o("targetCompanyKnow",t.target.value),placeholder:"e.g. Fintech consultancy servicing US clients..."})),React.createElement("td",null,React.createElement("textarea",{value:e.targetCompanyWhy,onChange:t=>o("targetCompanyWhy",t.target.value),placeholder:"e.g. Client mandates LLM guardrails; corporate budget available..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"Stated Pain / Interest")),React.createElement("td",null,React.createElement("textarea",{value:e.targetPainKnow,onChange:t=>o("targetPainKnow",t.target.value),placeholder:"e.g. Downloaded curriculum, clicked 3x on live syllabus..."})),React.createElement("td",null,React.createElement("textarea",{value:e.targetPainWhy,onChange:t=>o("targetPainWhy",t.target.value),placeholder:"e.g. High buyer intent; needs capstone confirmation..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"Timeline & Urgency")),React.createElement("td",null,React.createElement("textarea",{value:e.targetUrgencyKnow,onChange:t=>o("targetUrgencyKnow",t.target.value),placeholder:"e.g. Q4 upskilling budget; manager appraisal next month..."})),React.createElement("td",null,React.createElement("textarea",{value:e.targetUrgencyWhy,onChange:t=>o("targetUrgencyWhy",t.target.value),placeholder:"e.g. Authority to expense on card today..."}))))),React.createElement("h2",{className:"section-title"},"Target Buying Motive Hypothesis"),React.createElement("div",{className:"hypothesis-three-box"},React.createElement("div",{className:"hypo-box"},React.createElement("div",{className:"hypo-header"},"Initial Hypothesis"),React.createElement("div",{className:"hypo-sub"},"Why do you think this person will actually buy? (Be specific: career shift, promotion, deliverable, fear)"),React.createElement("textarea",{value:e.hypoInitial,onChange:t=>o("hypoInitial",t.target.value),rows:"4",placeholder:"Enter specific motive hypothesis..."})),React.createElement("div",{className:"hypo-box"},React.createElement("div",{className:"hypo-header"},"Evidence for Hypothesis"),React.createElement("div",{className:"hypo-sub"},"What data from their profile or behavior supports this?"),React.createElement("textarea",{value:e.hypoEvidence,onChange:t=>o("hypoEvidence",t.target.value),rows:"4",placeholder:"Lead score, visited links, past engagements..."})),React.createElement("div",{className:"hypo-box"},React.createElement("div",{className:"hypo-header"},"What I Still Do Not Know"),React.createElement("div",{className:"hypo-sub"},"What must be discovered in the first 10 minutes?"),React.createElement("textarea",{value:e.hypoUnknown,onChange:t=>o("hypoUnknown",t.target.value),rows:"4",placeholder:"Decision maker? Budget approved? Immediate project?"})))),React.createElement("section",{className:"sheet-page",id:"page-2"},React.createElement("div",{className:"page-header-row"},React.createElement("span",{className:"stage-badge-inline stage-1-badge"},"STAGE 1: BEFORE THE CALL"),React.createElement("span",null,"Page 2 of 7")),React.createElement("h2",{className:"section-title"},"Before the Call - 5 Prepared Probe Questions"),React.createElement("p",{className:"section-subtitle"},"Write these before the call. Every question must test a specific hypothesis."),React.createElement("table",{className:"table-sheet"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{style:{width:"8%",textAlign:"center"}},"#"),React.createElement("th",{style:{width:"38%"}},"Prepared Question"),React.createElement("th",{style:{width:"27%"}},"What Motive Does This Test?"),React.createElement("th",{style:{width:"27%"}},"Prepared Follow-Up"))),React.createElement("tbody",null,e.probes.map((t,a)=>React.createElement("tr",{key:a},React.createElement("td",{style:{textAlign:"center",fontWeight:"bold"}},a+1),React.createElement("td",null,React.createElement("textarea",{value:t.q,onChange:n=>L(a,"q",n.target.value),placeholder:`Enter prepared probe question #${a+1}...`})),React.createElement("td",null,React.createElement("textarea",{value:t.m,onChange:n=>L(a,"m",n.target.value),placeholder:"Motive / Hypothesis tested..."})),React.createElement("td",null,React.createElement("textarea",{value:t.f,onChange:n=>L(a,"f",n.target.value),placeholder:"If they say X, probe Y..."})))))),React.createElement("div",{className:"stage-action-bar"},React.createElement("button",{type:"button",className:"btn btn-secondary",onClick:()=>window.print()},"\u{1F5A8}\uFE0F Print Prep Notes"),React.createElement("button",{type:"button",className:"btn btn-next-stage",onClick:j},"Next: Start Live Call (Stage 2) \u{1F4DE}")))),l===2&&React.createElement("div",{className:"stage-container fade-in"},React.createElement("section",{className:"sheet-page",id:"page-3"},React.createElement("div",{className:"page-header-row"},React.createElement("span",{className:"stage-badge-inline stage-2-badge"},"STAGE 2: DURING THE CALL"),React.createElement("span",null,"Page 3 of 7")),React.createElement("div",{className:"rule-box completion"},React.createElement("div",{className:"rule-title"},"\u26A0\uFE0F Live Call Golden Rule"),"Record the prospect's exact verbatim words. Their words will become your pitch angle on Page 4."),React.createElement("h2",{className:"section-title"},"During the Call - Discovery Log"),React.createElement("p",{className:"section-subtitle"},"Record exact words. Do not paraphrase. The prospect's words are your pitch."),React.createElement("table",{className:"table-sheet"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{style:{width:"6%",textAlign:"center"}},"#"),React.createElement("th",{style:{width:"28%"}},"Question Asked"),React.createElement("th",{style:{width:"36%"}},"Prospect's Exact Response"),React.createElement("th",{style:{width:"15%"}},"Signals Detected"),React.createElement("th",{style:{width:"15%"}},"Immediate Follow-Up"))),React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",{style:{textAlign:"center",fontWeight:"bold"}},"1"),React.createElement("td",null,React.createElement("textarea",{value:e.discQ1,onChange:t=>o("discQ1",t.target.value),placeholder:"Discovery question 1..."})),React.createElement("td",null,React.createElement("textarea",{value:e.discAns1,onChange:t=>o("discAns1",t.target.value),placeholder:"Verbatim quote from prospect..."})),React.createElement("td",null,React.createElement("div",{className:"signal-grid"},["Pain","Urgency","Authority","Goal","Budget"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"checkbox",checked:e.sig1.includes(t),onChange:()=>f("sig1",t)}),React.createElement("span",null,t))))),React.createElement("td",null,React.createElement("textarea",{value:e.discF1,onChange:t=>o("discF1",t.target.value),placeholder:"Immediate follow-up asked..."}))),React.createElement("tr",null,React.createElement("td",{style:{textAlign:"center",fontWeight:"bold"}},"2"),React.createElement("td",null,React.createElement("textarea",{value:e.discQ2,onChange:t=>o("discQ2",t.target.value),placeholder:"Discovery question 2..."})),React.createElement("td",null,React.createElement("textarea",{value:e.discAns2,onChange:t=>o("discAns2",t.target.value),placeholder:"Verbatim quote from prospect..."})),React.createElement("td",null,React.createElement("div",{className:"signal-grid"},["Pain","Urgency","Authority","Goal","Budget"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"checkbox",checked:e.sig2.includes(t),onChange:()=>f("sig2",t)}),React.createElement("span",null,t))))),React.createElement("td",null,React.createElement("textarea",{value:e.discF2,onChange:t=>o("discF2",t.target.value),placeholder:"Immediate follow-up asked..."}))),React.createElement("tr",null,React.createElement("td",{style:{textAlign:"center",fontWeight:"bold"}},"3"),React.createElement("td",null,React.createElement("textarea",{value:e.discQ3,onChange:t=>o("discQ3",t.target.value),placeholder:"Discovery question 3..."})),React.createElement("td",null,React.createElement("textarea",{value:e.discAns3,onChange:t=>o("discAns3",t.target.value),placeholder:"Verbatim quote from prospect..."})),React.createElement("td",{style:{fontStyle:"italic",color:"#64748b"}},"Further Signals"),React.createElement("td",null,React.createElement("textarea",{value:e.discF3,onChange:t=>o("discF3",t.target.value),placeholder:"Follow-up asked..."}))))),React.createElement("h2",{className:"section-title"},"During the Call - Motive Synthesis (Do Before Pitching)"),React.createElement("div",{className:"hypothesis-three-box"},React.createElement("div",{className:"hypo-box"},React.createElement("div",{className:"hypo-header"},"What I Thought (Before Call)"),React.createElement("div",{className:"hypo-sub"},"Initial hypothesis from Page 1"),React.createElement("textarea",{value:e.synthInitial,onChange:t=>o("synthInitial",t.target.value),rows:"3",placeholder:"Initial hypothesis..."})),React.createElement("div",{className:"hypo-box"},React.createElement("div",{className:"hypo-header"},"What I Discovered (During Call)"),React.createElement("div",{className:"hypo-sub"},"What new information changes that?"),React.createElement("textarea",{value:e.synthNew,onChange:t=>o("synthNew",t.target.value),rows:"3",placeholder:"New information discovered..."})),React.createElement("div",{className:"hypo-box"},React.createElement("div",{className:"hypo-header"},"Final Validated Motive"),React.createElement("div",{className:"hypo-sub"},"This is the ONLY angle you pitch"),React.createElement("textarea",{value:e.synthFinal,onChange:t=>o("synthFinal",t.target.value),rows:"3",placeholder:"Exact verified buying motive..."}))),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr",gap:"12px",border:"1px solid #cbd5e1",padding:"12px",borderRadius:"4px",marginBottom:"20px"}},React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"6px"}},"Confidence Level in Motive"),React.createElement("div",{style:{display:"flex",gap:"12px"}},["High","Medium","Low"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"radio",name:"confidence",checked:e.confidence===t,onChange:()=>o("confidence",t)}),React.createElement("span",null,t))))),React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"6px"}},"Fit Decision"),React.createElement("div",{style:{display:"flex",gap:"12px"}},["Strong fit","Moderate fit","No fit"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"radio",name:"fitDecision",checked:e.fitDecision===t,onChange:()=>o("fitDecision",t)}),React.createElement("span",null,t))))),React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"4px"}},"Evidence for Fit"),React.createElement("input",{type:"text",value:e.fitEvidence,onChange:t=>o("fitEvidence",t.target.value),placeholder:"Why is this person a fit/no fit?"})))),React.createElement("section",{className:"sheet-page",id:"page-4"},React.createElement("div",{className:"page-header-row"},React.createElement("span",{className:"stage-badge-inline stage-2-badge"},"STAGE 2: DURING THE CALL"),React.createElement("span",null,"Page 4 of 7")),React.createElement("h2",{className:"section-title"},"During the Call - Customized Pitch Angle"),React.createElement("p",{className:"section-subtitle"},"Use the prospect's exact words from Page 3 to complete each step. Do not pitch generic features."),React.createElement("table",{className:"table-sheet"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{style:{width:"18%"}},"Pitch Step"),React.createElement("th",{style:{width:"28%"}},"Prompt / Framework"),React.createElement("th",{style:{width:"54%"}},"What You Actually Say (Customized)"))),React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"1. Hook")),React.createElement("td",{className:"prompt-cell"},'"Earlier you mentioned [exact quote]. That is exactly why..."'),React.createElement("td",null,React.createElement("textarea",{value:e.pitch1,onChange:t=>o("pitch1",t.target.value),placeholder:"Mirror their exact words back to them..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"2. Pain Validation")),React.createElement("td",{className:"prompt-cell"},'"Most [their role] in [their situation] tell us the hardest part is..."'),React.createElement("td",null,React.createElement("textarea",{value:e.pitch2,onChange:t=>o("pitch2",t.target.value),placeholder:"Validate the difficulty of their exact bottleneck..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"3. Risk of Inaction")),React.createElement("td",{className:"prompt-cell"},`"If this isn't solved in the next [their timeline], what happens to..."`),React.createElement("td",null,React.createElement("textarea",{value:e.pitch3,onChange:t=>o("pitch3",t.target.value),placeholder:"State the cost of waiting another month..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"4. Solution Vision")),React.createElement("td",{className:"prompt-cell"},`"What you need isn't another [generic alternative], it's..."`),React.createElement("td",null,React.createElement("textarea",{value:e.pitch4,onChange:t=>o("pitch4",t.target.value),placeholder:"Contrast generic courses with this outcome-driven cohort..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"5. Why This Training")),React.createElement("td",{className:"prompt-cell"},'"The reason this works for [their situation] specifically is..."'),React.createElement("td",null,React.createElement("textarea",{value:e.pitch5,onChange:t=>o("pitch5",t.target.value),placeholder:"Connect our architecture mentorship to their specific need..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"6. Practical Relevance")),React.createElement("td",{className:"prompt-cell"},'"By the end of [timeframe], you will have built [exact deliverable]..."'),React.createElement("td",null,React.createElement("textarea",{value:e.pitch6,onChange:t=>o("pitch6",t.target.value),placeholder:"Confirm the capstone will directly solve their active problem..."}))),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"7. Call to Action")),React.createElement("td",{className:"prompt-cell"},`"Based on what you've shared, the right step is [action]. Shall we..."`),React.createElement("td",null,React.createElement("textarea",{value:e.pitch7,onChange:t=>o("pitch7",t.target.value),placeholder:"Direct invitation to enroll / reserve seat today..."}))))),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr",gap:"12px",border:"1px solid #cbd5e1",padding:"12px",borderRadius:"4px",marginBottom:"20px"}},React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"4px"}},"Prospect Response to Pitch"),React.createElement("input",{type:"text",value:e.pitchProspectResponse,onChange:t=>o("pitchProspectResponse",t.target.value),placeholder:"Reaction quote..."})),React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"6px"}},"Close Attempted?"),React.createElement("div",{style:{display:"flex",gap:"10px"}},["Asked to enroll","Scheduled call","No close"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"radio",name:"closeAttempted",checked:e.closeAttempted===t,onChange:()=>o("closeAttempted",t)}),React.createElement("span",null,t))))),React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"6px"}},"Decision at Pitch"),React.createElement("div",{style:{display:"flex",gap:"10px"}},["Enrolled","Wants time","Objected"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"radio",name:"pitchDecision",checked:e.pitchDecision===t,onChange:()=>o("pitchDecision",t)}),React.createElement("span",null,t))))))),React.createElement("section",{className:"sheet-page",id:"page-5"},React.createElement("div",{className:"page-header-row"},React.createElement("span",{className:"stage-badge-inline stage-2-badge"},"STAGE 2: DURING THE CALL"),React.createElement("span",null,"Page 5 of 7")),React.createElement("h2",{className:"section-title"},"During the Call - Objections Log"),React.createElement("p",{className:"section-subtitle"},"Record every objection raised. Every objection is a signal of an unresolved motive."),React.createElement("table",{className:"table-sheet"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{style:{width:"6%",textAlign:"center"}},"#"),React.createElement("th",{style:{width:"32%"}},"Exact Objection Stated"),React.createElement("th",{style:{width:"28%"}},"Root Cause Behind It"),React.createElement("th",{style:{width:"24%"}},"Response Given"),React.createElement("th",{style:{width:"10%",textAlign:"center"}},"Resolved?"))),React.createElement("tbody",null,e.objections.map((t,a)=>React.createElement("tr",{key:a},React.createElement("td",{style:{textAlign:"center",fontWeight:"bold"}},a+1),React.createElement("td",null,React.createElement("textarea",{value:t.exact,onChange:n=>E(a,"exact",n.target.value),placeholder:"e.g. 'Can I expense this on corporate card?'"})),React.createElement("td",null,React.createElement("textarea",{value:t.cause,onChange:n=>E(a,"cause",n.target.value),placeholder:"e.g. Payment paperwork assurance..."})),React.createElement("td",null,React.createElement("textarea",{value:t.resp,onChange:n=>E(a,"resp",n.target.value),placeholder:"e.g. GST invoice issued automatically..."})),React.createElement("td",{style:{textAlign:"center"}},React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"4px",alignItems:"center"}},React.createElement("label",{className:"checkbox-item"},React.createElement("input",{type:"radio",name:`objRes_${a}`,checked:t.res==="Resolved",onChange:()=>E(a,"res","Resolved")}),React.createElement("span",null,"Yes")),React.createElement("label",{className:"checkbox-item"},React.createElement("input",{type:"radio",name:`objRes_${a}`,checked:t.res==="Unresolved",onChange:()=>E(a,"res","Unresolved")}),React.createElement("span",null,"No")))))))),React.createElement("div",{style:{border:"1px solid #cbd5e1",padding:"12px",borderRadius:"4px",marginBottom:"20px"}},React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"6px"}},"Primary Objection Category"),React.createElement("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"}},["Price","Time","Authority","Fit","Trust","Course format"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"radio",name:"objCategory",checked:e.objCategory===t,onChange:()=>o("objCategory",t)}),React.createElement("span",null,t))))),React.createElement("div",{className:"stage-action-bar"},React.createElement("button",{type:"button",className:"btn btn-secondary",onClick:Q},"\u2190 Back to Stage 1 (Prep)"),React.createElement("button",{type:"button",className:"btn btn-next-stage",onClick:j},"Next: Wrap Up Call & Outcome (Stage 3) \u{1F3C1}")))),l===3&&React.createElement("div",{className:"stage-container fade-in"},React.createElement("section",{className:"sheet-page",id:"page-6"},React.createElement("div",{className:"page-header-row"},React.createElement("span",{className:"stage-badge-inline stage-3-badge"},"STAGE 3: AFTER THE CALL"),React.createElement("span",null,"Page 6 of 7")),React.createElement("div",{className:"rule-box completion"},React.createElement("div",{className:"rule-title"},"\u26A0\uFE0F Mandatory CRM Rule"),"Complete the outcome and sync to Nebula CRM immediately after hanging up while the conversation details are fresh."),React.createElement("h2",{className:"section-title"},"After the Call - Outcome & Action Record"),React.createElement("table",{className:"table-sheet",style:{marginBottom:"16px"}},React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",{style:{width:"25%",fontWeight:"bold"}},"Final Call Outcome"),React.createElement("td",{style:{width:"75%"}},React.createElement("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"}},["Won / enrolled","Follow-up scheduled","Lost - objection unhandled","Lost - timing","Disqualified"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"radio",name:"finalOutcome",checked:e.finalOutcome===t,onChange:()=>o("finalOutcome",t)}),React.createElement("span",null,t)))))),React.createElement("tr",null,React.createElement("td",{style:{fontWeight:"bold"}},"Next Action Required"),React.createElement("td",null,React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"6px"}},["Send payment link","Send curriculum","Send proof/case study","Schedule follow-up","Send recording","Close lead"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"checkbox",checked:e.nextActions.includes(t),onChange:()=>f("nextActions",t)}),React.createElement("span",null,t)))))),React.createElement("tr",null,React.createElement("td",{style:{fontWeight:"bold"}},"Action Ownership & Due Date"),React.createElement("td",null,React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}},React.createElement("div",null,React.createElement("label",{style:{fontSize:"11px",color:"#64748b"}},"Owner:"),React.createElement("input",{type:"text",value:e.actionOwner,onChange:t=>o("actionOwner",t.target.value),placeholder:"Owner Rep Name"})),React.createElement("div",null,React.createElement("label",{style:{fontSize:"11px",color:"#64748b"}},"Due Date / Time:"),React.createElement("div",{className:"datetime-picker-wrap",style:{marginTop:"2px"}},React.createElement("input",{type:"datetime-local",className:"datetime-input",value:e.actionDueDate,onChange:t=>o("actionDueDate",t.target.value)}),React.createElement("div",{className:"date-quick-presets"},React.createElement("button",{type:"button",className:"preset-chip",onClick:()=>{const t=new Date(Date.now()+864e5),a=i=>String(i).padStart(2,"0"),n=`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`;o("actionDueDate",n)},title:"Set due tomorrow"},"+1d"),React.createElement("button",{type:"button",className:"preset-chip",onClick:()=>{const t=new Date(Date.now()+2592e5),a=i=>String(i).padStart(2,"0"),n=`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`;o("actionDueDate",n)},title:"Set due in 3 days"},"+3d"),React.createElement("button",{type:"button",className:"preset-chip",onClick:()=>{const t=new Date(Date.now()+6048e5),a=i=>String(i).padStart(2,"0"),n=`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`;o("actionDueDate",n)},title:"Set due in 1 week"},"+7d"))))))),React.createElement("tr",null,React.createElement("td",{style:{fontWeight:"bold"}},"Collateral / Proof Needed"),React.createElement("td",null,React.createElement("input",{type:"text",value:e.objEvidenceNeeded,onChange:t=>o("objEvidenceNeeded",t.target.value),placeholder:"What proof did the prospect ask for?"}))))),React.createElement("h2",{className:"section-title"},"After the Call - 5 Key Learnings from This Call"),React.createElement("table",{className:"table-sheet"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{style:{width:"8%",textAlign:"center"}},"#"),React.createElement("th",{style:{width:"40%"}},"Learning Dimension"),React.createElement("th",{style:{width:"52%"}},"What This Call Taught Me"))),React.createElement("tbody",null,["1. Buying Motive","2. Most Effective Probe","3. Worst Assumption I Made","4. Objection I Was Unprepared For","5. Script / Question to Improve"].map((t,a)=>React.createElement("tr",{key:a},React.createElement("td",{style:{textAlign:"center",fontWeight:"bold"}},a+1),React.createElement("td",null,React.createElement("strong",null,t)),React.createElement("td",null,React.createElement("textarea",{value:e.learnings[a],onChange:n=>se(a,n.target.value),placeholder:`Enter key learning #${a+1}...`})))))),React.createElement("div",{className:"nebula-sync-card"},React.createElement("div",{className:"nebula-card-header"},React.createElement("div",{className:"nebula-brand"},React.createElement("span",{className:"nebula-icon"},"\u{1F30C}"),React.createElement("strong",null,"Nebula CRM REST Integration")),React.createElement("span",{className:`nebula-status-badge ${e.nebulaSyncStatus.startsWith("Synced")?"synced":e.nebulaSyncStatus==="Error"?"error":"pending"}`},e.nebulaSyncStatus)),React.createElement("p",{className:"nebula-desc"},"Push live call notes, verbatim discovery answers, stage durations (",formatDuration(s[1])," prep, ",formatDuration(s[2])," live, ",formatDuration(s[3])," post-call), and follow-up commitments directly to your Nebula CRM endpoint (",React.createElement("code",null,normalizeNebulaUrl(C)),")."),A&&React.createElement("div",{className:"nebula-error-banner"},React.createElement("span",null,"\u26A0\uFE0F"),React.createElement("div",null,React.createElement("strong",null,"Push Failed:")," ",A)),b&&React.createElement("div",{className:"nebula-success-banner"},React.createElement("div",null,React.createElement("span",null,"\u2705"),React.createElement("strong",null," Record Created:")," ",React.createElement("code",null,b)),React.createElement("button",{type:"button",className:"preset-chip",onClick:()=>{navigator.clipboard.writeText(b),h("\u{1F4CB} Copied Record ID to clipboard!")}},"Copy ID")),U&&React.createElement("div",{className:"nebula-config-box"},React.createElement("div",{className:"nebula-config-row"},React.createElement("label",{className:"nebula-config-label"},"Nebula REST Endpoint URL"),React.createElement("input",{type:"text",className:"nebula-config-input",value:C,onChange:t=>O(t.target.value),placeholder:"https://nebula.tayanasolutions.com/rest/liveCallSheets"})),React.createElement("div",{className:"nebula-config-row"},React.createElement("label",{className:"nebula-config-label"},"Bearer Token"),React.createElement("input",{type:"password",className:"nebula-config-input",value:w,onChange:t=>D(t.target.value),placeholder:"Bearer eyJhbGci..."})),React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"6px"}},React.createElement("button",{type:"button",className:"preset-chip",onClick:()=>{O(DEFAULT_NEBULA_API_URL),D(DEFAULT_NEBULA_TOKEN),h("Reset endpoint & token to defaults")}},"Reset to Default"))),React.createElement("div",{className:"nebula-card-actions"},React.createElement("button",{type:"button",className:"btn-submit-call",onClick:x,disabled:v},v?"\u23F3 Submitting Payload to Nebula...":"\u{1F680} Submit Call Sheet to Nebula CRM"),React.createElement("button",{type:"button",className:"btn btn-secondary",onClick:()=>ie(t=>!t)},"\u2699\uFE0F ",U?"Hide Config":"Configure Endpoint & Auth"),React.createElement("button",{type:"button",className:"btn btn-secondary",onClick:()=>T(!0)},"\u{1F50D} View REST & DB Schema")))),React.createElement("section",{className:"sheet-page",id:"page-7"},React.createElement("div",{className:"page-header-row"},React.createElement("span",{className:"stage-badge-inline stage-3-badge"},"STAGE 3: AFTER THE CALL"),React.createElement("span",null,"Page 7 of 7")),React.createElement("h2",{className:"section-title"},"After the Call - Quality Review & Sign-Off"),React.createElement("p",{className:"section-subtitle"},"Review by rep and sales lead before closing out the call record."),React.createElement("table",{className:"table-sheet"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{style:{width:"45%"}},"Mandatory Requirement"),React.createElement("th",{style:{width:"20%",textAlign:"center"}},"Completed?"),React.createElement("th",{style:{width:"35%"}},"Reviewer Check"))),React.createElement("tbody",null,[{id:"target_hypo",label:"1. Target hypothesis completed before dial"},{id:"probes_5",label:"2. All 5 probe questions prepared before dial"},{id:"prospect_ans",label:"3. Exact prospect answers recorded during call"},{id:"buying_motive",label:"4. Buying motive updated based on discovery"},{id:"custom_pitch",label:"5. Pitch customized using prospect's exact words"},{id:"obj_log",label:"6. Objections logged with root causes"},{id:"outcome",label:"7. Final outcome and next action recorded"},{id:"next_action",label:"8. Next action has owner and due date"}].map(t=>React.createElement("tr",{key:t.id},React.createElement("td",null,React.createElement("strong",null,t.label)),React.createElement("td",{style:{textAlign:"center"}},React.createElement("input",{type:"checkbox",checked:e.mandatoryCheck.includes(t.id),onChange:()=>f("mandatoryCheck",t.id),style:{width:"16px",height:"16px"}})),React.createElement("td",{style:{color:"#64748b",fontSize:"11.5px"}},"Verified against live notes"))))),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",border:"1px solid #cbd5e1",padding:"12px",borderRadius:"4px",marginBottom:"20px"}},React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"6px"}},"Sheet Quality Rating"),React.createElement("div",{style:{display:"flex",gap:"12px"}},["1 - Poor","2 - Incomplete","3 - Adequate","4 - Good","5 - Exemplary"].map((t,a)=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"radio",name:"sheetQuality",checked:e.sheetQuality===String(a+1),onChange:()=>o("sheetQuality",String(a+1))}),React.createElement("span",null,a+1))))),React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"6px"}},"Ready for Next Call?"),React.createElement("div",{style:{display:"flex",gap:"12px"}},["Yes","No - review needed"].map(t=>React.createElement("label",{key:t,className:"checkbox-item"},React.createElement("input",{type:"radio",name:"readyNextCall",checked:e.readyNextCall===t,onChange:()=>o("readyNextCall",t)}),React.createElement("span",null,t)))))),React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:"12px",marginBottom:"4px"}},"Reviewer Notes"),React.createElement("textarea",{value:e.reviewerNotes,onChange:t=>o("reviewerNotes",t.target.value),rows:"3",placeholder:"Coaching feedback from sales lead..."})),b&&React.createElement("div",{className:"submission-card"},React.createElement("div",{className:"submission-card-header"},React.createElement("span",{className:"submission-title"},"✅ Call Sheet Submitted to Nebula CRM"),React.createElement("span",{className:"nebula-status-badge synced"},`Record ID: ${b}`)),React.createElement("div",{className:"submission-details"},`Your live call sheet data has been saved to Nebula CRM. Caller: ${e.metaCaller||"N/A"}, Prospect: ${e.metaProspect||"N/A"}.`),React.createElement("div",{style:{display:"flex",gap:"8px"}},React.createElement("button",{className:"btn btn-secondary",style:{fontSize:"12px",padding:"6px 12px"},onClick:K},"📋 Copy JSON Payload"),React.createElement("button",{className:"btn btn-primary",style:{fontSize:"12px",padding:"6px 12px"},onClick:()=>T(!0)},"🌌 View Nebula CRM Record"))),React.createElement("div",{className:"stage-action-bar"},React.createElement("button",{type:"button",className:"btn btn-secondary",onClick:Q},"\u2190 Back to Stage 2 (During Call)"),React.createElement("button",{type:"button",className:"btn-submit-call",onClick:x,disabled:v},v?"\u23F3 Submitting Payload to Nebula...":"\u{1F680} Submit Call Sheet to Nebula CRM"))))
      )
    )
  ),showHistory&&React.createElement("div",{className:"modal-overlay",onClick:()=>setShowHistory(!1)},
React.createElement("div",{className:"modal-content",onClick:t=>t.stopPropagation(),style:{maxWidth:"850px"}},
React.createElement("div",{className:"modal-header"},
React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},
React.createElement("span",{style:{fontSize:"20px"}},"📜"),
React.createElement("div",null,
React.createElement("h3",{style:{margin:0}},"Submitted Call Sheets History"),
React.createElement("p",{style:{margin:"2px 0 0 0",fontSize:"12px",color:"#64748b"}},
`${history.length} call sheet${history.length===1?"":"s"} submitted and saved locally.`
))),
React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},
history.length>0&&React.createElement("button",{className:"btn btn-outline-danger",style:{fontSize:"12px",padding:"4px 10px"},onClick:clearAllHistory},"🗑️ Clear History"),
React.createElement("button",{className:"modal-close-btn",onClick:()=>setShowHistory(!1)},"×")
)),
React.createElement("div",{className:"modal-body",style:{padding:"16px 24px"}},
history.length===0?React.createElement("div",{className:"history-empty"},
React.createElement("div",{className:"history-empty-icon"},"📭"),
React.createElement("h4",{style:{margin:"0 0 6px 0",color:"#475569"}},"No Call History Yet"),
React.createElement("p",{style:{margin:0,fontSize:"13px"}},"Complete a call sheet and click '🚀 Submit Call Sheet to Nebula CRM' — it will be recorded here and reset for your next call.")
):React.createElement("div",{className:"history-list"},
history.map((item,idx)=>React.createElement("div",{key:item.id||idx,className:"history-card"},
React.createElement("div",{className:"history-card-header"},
React.createElement("span",{className:"history-prospect"},"👤 "+(item.prospect||"Untitled Prospect")),
React.createElement("div",{className:"history-meta-badges"},
React.createElement("span",{className:"history-badge"},"📅 "+(item.date||"N/A")),
React.createElement("span",{className:"history-badge time"},"⏱️ "+(item.duration||"00:00")),
React.createElement("span",{className:"history-badge outcome"},item.outcome||"Submitted"),
React.createElement("span",{className:"history-badge id",title:"Nebula Record ID"},"ID: "+(item.id?item.id.slice(0,8)+"...":"Local"))
)),
React.createElement("div",{className:"history-card-body"},
`Caller: ${item.caller||"Sales Rep"} | Stages: Prep: ${formatDuration(item.stageTimes?.[1]||0)}, Live: ${formatDuration(item.stageTimes?.[2]||0)}, Post: ${formatDuration(item.stageTimes?.[3]||0)}`
),
React.createElement("div",{className:"history-card-actions"},
React.createElement("button",{type:"button",className:"btn-history-copy",onClick:()=>{navigator.clipboard.writeText(JSON.stringify(item.payload,null,2));h("📋 Copied complete JSON payload to clipboard!");}},"📋 Copy JSON Payload"),
React.createElement("button",{type:"button",className:"btn-history-load",onClick:()=>loadHistoryIntoSheet(item)},"🔄 Load into Worksheet"),
React.createElement("button",{type:"button",className:"btn-history-delete",onClick:()=>deleteHistoryItem(item.id)},"🗑️")
)
)))),
React.createElement("div",{className:"modal-footer",style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},
React.createElement("span",{style:{fontSize:"12px",color:"#64748b"}},`Total: ${history.length} submitted call record${history.length===1?"":"s"}`),
React.createElement("button",{className:"btn btn-secondary",onClick:()=>setShowHistory(!1)},"Close")
))),ne&&React.createElement("div",{className:"modal-overlay",onClick:()=>T(!1)},React.createElement("div",{className:"modal-content",onClick:t=>t.stopPropagation(),style:{maxWidth:"850px"}},React.createElement("div",{className:"modal-header"},React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},React.createElement("span",{style:{fontSize:"20px"}},"\u{1F30C}"),React.createElement("h3",null,"Nebula CRM Integration Hub")),React.createElement("button",{className:"modal-close-btn",onClick:()=>T(!1)},"\xD7")),React.createElement("div",{className:"modal-body"},React.createElement("div",{className:"modal-tabs"},React.createElement("button",{className:`modal-tab-btn ${y==="push"?"active":""}`,onClick:()=>R("push")},"\u{1F680} Push to REST API"),React.createElement("button",{className:`modal-tab-btn ${y==="restJson"?"active":""}`,onClick:()=>R("restJson")},"\u{1F4E6} REST API Payload (JSON)"),React.createElement("button",{className:`modal-tab-btn ${y==="rawSchema"?"active":""}`,onClick:()=>R("rawSchema")},"\u{1F5C4}\uFE0F PostgreSQL Schema (102 Columns)")),y==="push"&&React.createElement("div",null,React.createElement("p",{style:{fontSize:"13px",color:"#475569",marginBottom:"12px"}},"Push this completed sales call directly to your Nebula CRM instance via HTTP POST with Bearer authentication."),React.createElement("div",{className:"crm-timing-pills-row",style:{marginBottom:"14px"}},React.createElement("div",{className:"crm-time-chip"},React.createElement("strong",null,"Stage 1 (Prep):")," ",formatDuration(s[1])),React.createElement("div",{className:"crm-time-chip"},React.createElement("strong",null,"Stage 2 (Live Call):")," ",formatDuration(s[2])),React.createElement("div",{className:"crm-time-chip"},React.createElement("strong",null,"Stage 3 (Wrap Up):")," ",formatDuration(s[3])),React.createElement("div",{className:"crm-time-chip highlight"},React.createElement("strong",null,"Total Combined:")," ",formatDuration(N))),React.createElement("div",{className:"nebula-config-box"},React.createElement("div",{className:"nebula-config-row"},React.createElement("label",{className:"nebula-config-label"},"Nebula REST Endpoint URL"),React.createElement("input",{type:"text",className:"nebula-config-input",value:C,onChange:t=>O(t.target.value)})),React.createElement("div",{className:"nebula-config-row"},React.createElement("label",{className:"nebula-config-label"},"Bearer Token"),React.createElement("input",{type:"password",className:"nebula-config-input",value:w,onChange:t=>D(t.target.value)}))),A&&React.createElement("div",{className:"nebula-error-banner"},React.createElement("span",null,"\u26A0\uFE0F"),React.createElement("div",null,React.createElement("strong",null,"Push Error:")," ",A)),b&&React.createElement("div",{className:"nebula-success-banner"},React.createElement("div",null,React.createElement("span",null,"\u{1F389}"),React.createElement("strong",null," Record successfully created in Nebula CRM!"),React.createElement("div",{style:{fontSize:"11px",marginTop:"2px"}},"Record ID: ",React.createElement("code",null,b))),React.createElement("button",{type:"button",className:"preset-chip",onClick:()=>{navigator.clipboard.writeText(b),h("\u{1F4CB} Copied Record ID to clipboard!")}},"Copy Record ID")),B&&React.createElement("div",{style:{marginTop:"12px"}},React.createElement("div",{style:{fontSize:"11.5px",fontWeight:600,color:"#64748b",marginBottom:"4px"}},"Last Server Response:"),React.createElement("pre",{className:"crm-json-preview",style:{maxHeight:"180px"}},JSON.stringify(B,null,2)))),y==="restJson"&&React.createElement("div",null,React.createElement("p",{style:{fontSize:"13px",color:"#475569",marginBottom:"10px"}},"This is the JSON body sent to ",React.createElement("code",null,"POST ",normalizeNebulaUrl(C))," with formatted markdown blocks and schema enums."),React.createElement("pre",{className:"crm-json-preview"},JSON.stringify(M(),null,2))),y==="rawSchema"&&React.createElement("div",null,React.createElement("p",{style:{fontSize:"13px",color:"#475569",marginBottom:"10px"}},"Flat 102-column representation matching the PostgreSQL table ",React.createElement("code",null,"_liveCallSheet")," with separated Blocknote and Markdown columns."),React.createElement("pre",{className:"crm-json-preview"},JSON.stringify(Y(),null,2)))),React.createElement("div",{className:"modal-footer"},y==="push"&&React.createElement(React.Fragment,null,React.createElement("button",{className:"btn btn-secondary",onClick:()=>T(!1)},"Close"),React.createElement("button",{className:"btn-submit-call",onClick:x,disabled:v},v?"\u23F3 Submitting...":"\u{1F680} Submit Call Sheet to Nebula CRM")),y==="restJson"&&React.createElement(React.Fragment,null,React.createElement("button",{className:"btn btn-secondary",onClick:()=>{navigator.clipboard.writeText(JSON.stringify(M(),null,2)),h("\u{1F4CB} REST JSON copied to clipboard!")}},"\u{1F4CB} Copy REST JSON"),React.createElement("button",{className:"btn-submit-call",onClick:x,disabled:v},v?"\u23F3 Submitting...":"\u{1F680} Submit This JSON Payload")),y==="rawSchema"&&React.createElement(React.Fragment,null,React.createElement("button",{className:"btn btn-secondary",onClick:()=>{navigator.clipboard.writeText(JSON.stringify(Y(),null,2)),h("\u{1F4CB} 102-Column DB JSON copied to clipboard!")}},"\u{1F4CB} Copy 102-Column JSON"),React.createElement("button",{className:"btn btn-secondary",onClick:K},"\u{1F4C4} Copy Markdown Summary"))))),React.createElement("div",{className:`toast ${F?"show":""}`},F))}const root=ReactDOM.createRoot(document.getElementById("root"));root.render(React.createElement(LiveCallSheetApp,null));
