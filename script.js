
const questions = [

    {q:"Saya suka memperbaiki mesin atau alat.",type:"R"},
    {q:"Saya suka bekerja dengan alat mekanik.",type:"R"},
    {q:"Saya tertarik membuat atau membangun sesuatu.",type:"R"},
    {q:"Saya suka kegiatan lapangan.",type:"R"},
    {q:"Saya suka mengoperasikan alat berat.",type:"R"},
    
    {q:"Saya suka melakukan eksperimen.",type:"I"},
    {q:"Saya suka memecahkan masalah kompleks.",type:"I"},
    {q:"Saya tertarik pada sains dan penelitian.",type:"I"},
    {q:"Saya suka menganalisis data.",type:"I"},
    {q:"Saya suka belajar teori baru.",type:"I"},
    
    {q:"Saya suka menggambar atau desain.",type:"A"},
    {q:"Saya suka membuat karya seni.",type:"A"},
    {q:"Saya suka musik atau teater.",type:"A"},
    {q:"Saya suka menulis cerita.",type:"A"},
    {q:"Saya suka kreativitas visual.",type:"A"},
    
    {q:"Saya suka membantu orang lain.",type:"S"},
    {q:"Saya suka mengajar atau membimbing.",type:"S"},
    {q:"Saya suka kegiatan sosial.",type:"S"},
    {q:"Saya suka bekerja dalam tim.",type:"S"},
    {q:"Saya peduli pada kesejahteraan orang lain.",type:"S"},
    
    {q:"Saya suka memimpin organisasi.",type:"E"},
    {q:"Saya suka memulai bisnis.",type:"E"},
    {q:"Saya suka mempengaruhi orang.",type:"E"},
    {q:"Saya suka mengambil keputusan penting.",type:"E"},
    {q:"Saya suka berbicara di depan umum.",type:"E"},
    
    {q:"Saya suka mengatur data.",type:"C"},
    {q:"Saya suka administrasi.",type:"C"},
    {q:"Saya suka bekerja dengan angka.",type:"C"},
    {q:"Saya suka pekerjaan terstruktur.",type:"C"},
    {q:"Saya suka membuat laporan.",type:"C"}
    
    ];
    
    let currentQuestion = 0
    let answers = new Array(questions.length)
    
    function startTest(){
    document.getElementById("startPage").classList.add("hidden")
    document.getElementById("quizPage").classList.remove("hidden")
    showQuestion()
    }
    
    function showQuestion(){
    
    let q = questions[currentQuestion]
    
    document.getElementById("questionText").innerText =
    (currentQuestion+1)+". "+q.q
    
    let html=""
    
    const scale=[
    "Sangat Tidak Suka",
    "Tidak Suka",
    "Netral",
    "Suka",
    "Sangat Suka"
    ]
    
    scale.forEach((text,i)=>{
    
    html+=`
    <label>
    <input type="radio" name="answer" value="${i+1}" ${answers[currentQuestion]==i+1?"checked":""}>
    ${i+1} - ${text}
    </label>
    `
    
    })
    
    document.getElementById("answers").innerHTML=html
    
    updateProgress()
    
    }
    
    function nextQuestion(){
    
    let selected=document.querySelector('input[name="answer"]:checked')
    
    if(!selected){
    alert("Jawab pertanyaan terlebih dahulu")
    return
    }
    
    answers[currentQuestion]=parseInt(selected.value)
    
    if(currentQuestion<questions.length-1){
    
    currentQuestion++
    showQuestion()
    
    }else{
    
    calculateResult()
    
    }
    
    }
    
    function prevQuestion(){
    
    if(currentQuestion>0){
    currentQuestion--
    showQuestion()
    }
    
    }
    
    function updateProgress(){
    
    let percent=(currentQuestion/questions.length)*100
    
    document.getElementById("progressBar").style.width=percent+"%"
    
    }
    
    function calculateResult(){
    
    let scores={
    R:0,I:0,A:0,S:0,E:0,C:0
    }
    
    questions.forEach((q,i)=>{
    
    scores[q.type]+=answers[i]
    
    })
    
    showResult(scores)
    
    }
    
    function showResult(scores){
    
    document.getElementById("quizPage").classList.add("hidden")
    document.getElementById("resultPage").classList.remove("hidden")
    
    const labels={
    R:"Realistic",
    I:"Investigative",
    A:"Artistic",
    S:"Social",
    E:"Enterprising",
    C:"Conventional"
    }
    
    let scoreHTML=""
    
    Object.keys(scores).forEach(k=>{
    scoreHTML+=`<div>${labels[k]} : ${scores[k]}</div>`
    })
    
    document.getElementById("scoreList").innerHTML=scoreHTML
    
    let sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1])
    
    let top3=sorted.slice(0,3).map(v=>labels[v[0]])
    
    document.getElementById("topTypes").innerHTML=
    "Tipe dominan kamu: "+top3.join(", ")
    
    let desc={
    Investigative:"Analitis, suka penelitian dan pemecahan masalah.",
    Artistic:"Kreatif dan ekspresif.",
    Social:"Suka membantu dan berinteraksi dengan orang.",
    Enterprising:"Suka memimpin dan bisnis.",
    Conventional:"Terorganisir dan teliti.",
    Realistic:"Praktis dan suka pekerjaan teknis."
    }
    
    document.getElementById("description").innerHTML=
    top3.map(t=>"<p><b>"+t+"</b>: "+desc[t]+"</p>").join("")
    
    const majorMap={
    Realistic:["Teknik Mesin","Teknik Elektro"],
    Investigative:["Teknik Informatika","Kedokteran","Data Science"],
    Artistic:["Desain Grafis","Arsitektur"],
    Social:["Psikologi","Pendidikan"],
    Enterprising:["Manajemen","Bisnis"],
    Conventional:["Akuntansi","Administrasi"]
    }
    
    let majors=[]
    
    sorted.slice(0,3).forEach(v=>{
    majors=majors.concat(majorMap[labels[v[0]]])
    })
    
    majors=[...new Set(majors)]
    
    document.getElementById("majors").innerHTML=
    "<h3>Rekomendasi Jurusan:</h3>"+majors.join(", ")
    
    createChart(scores)
    
    }
    
    function createChart(scores){
    
    new Chart(document.getElementById("resultChart"),{
    
    type:"radar",
    
    data:{
    labels:[
    "Realistic",
    "Investigative",
    "Artistic",
    "Social",
    "Enterprising",
    "Conventional"
    ],
    
    datasets:[{
    
    label:"Skor RIASEC",
    
    data:[
    scores.R,
    scores.I,
    scores.A,
    scores.S,
    scores.E,
    scores.C
    ]
    
    }]
    
    }
    
    })
    
    }
    
    function restartTest(){
    
    location.reload()
    
    }
