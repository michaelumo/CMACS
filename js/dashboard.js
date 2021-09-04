var Global_Credit_Data = {};
var Global_Grade_Id = ['s2','s1','5','4']
var Global_Grade_Name = {'s2':'専攻科2年','s1':'専攻科1年','5':'本科5年','4':'本科4年'}
var Search_Spec_Key = {'A':'人文科学・社会科学','B':'数学・自然科学・情報技術','C':'①設計・システム系',
'D':'②情報・論理系','E':'③材料・バイオ系','F':'④力学系','G':'⑤社会技術系','H':'専門工学の知識・能力 a', 'I':'専門工学の知識・能力 b,c,d'}
var Spec_to_Name = {};
var Name_to_All_Data = {};
var Search_Spec_Short_Key = {'A':'ア','B':'イ','C':'ウ','H':'エ', 'I':'オ'}
var Search_Spec_Short_Id = ['A','B','C','H', 'I']
var Search_Spec_Short_Map = {'A':['A'],'B':['B'],'C':['C','D','E','F','G'], 'H':['H'], 'I':['I']}
var Search_Spec_Color = {'A':'#fcba03','B':'#ed231c','C':'#5c7ae6','D':'#5c7ae6',
'E':'#5c7ae6','F':'#5c7ae6','G':'#5c7ae6','H':'#ba50de','I':'#ed3755'}
const JABEE_Radar = [Search_Spec_Short_Key['A'], Search_Spec_Short_Key['B'], Search_Spec_Short_Key['C'], Search_Spec_Short_Key['H'], Search_Spec_Short_Key['I']];
const grade = ['S','A','B','C','D']

var row1 = document.createElement("div");
row1.className = "row";
row1.style = "padding-top: 10px; padding-left: 5%;"

var col1 = {}
var col2 = {}
var buttons = {}


function init_dashboard_data(data, from_excel){
  clear_chart();
  Global_Credit_Data = data;
  make_subjects_by_id();
  make_subjects_by_name();
  categorize_subjects();
  Calc();
}
function getExcelFile(){
  document.getElementById("uploadExcel").click();
}

function uploadExcel(selectedFile) {
  if (selectedFile) {
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: "binary"
      });
      var data = {}
      var name_flag = false;
      workbook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        if(Global_Grade_Id.includes(sheet) || sheet === "0"){
          data[sheet] = rowObject;
          name_flag = true;
          if(sheet === "0"){
            document.getElementById("Department").value = data[sheet][0]["コース"]
          }
        }
      });
      if(name_flag){
        init_dashboard_data(data, true);
      }
    };
    fileReader.readAsBinaryString(selectedFile);
  }
}

function downloadExcel() {
    /* create a new blank workbook */
    var wb = XLSX.utils.book_new();
    for(i in Global_Credit_Data){
      /* create a worksheet for subjects */
      var ws = XLSX.utils.json_to_sheet(Global_Credit_Data[i]);
      /* Add the worksheet to the workbook */
      XLSX.utils.book_append_sheet(wb, ws, i);
    }
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data1 = new Blob([excelBuffer], { type: fileType });
    saveAs(data1, "cmacs_data.xlsx");
}

function loadJSON(path, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
 }

function make_subjects_by_id(){// spec id(A,B,C...) to subject name
  for(id in Search_Spec_Key){
    Spec_to_Name[id] = [];// id: A,B,C...
   for (j of Global_Grade_Id){// j: 4,5,s1...
     for(i = 0; i < Global_Credit_Data[j].length; i++) {
       if(id === Global_Credit_Data[j][i]['spec']){
         Spec_to_Name[id].push(Global_Credit_Data[j][i]['name']);
       }
     }
   }
  }
}

function make_subjects_by_name(){// subject name to its data
 for (j of Global_Grade_Id){
   for(i = 0; i < Global_Credit_Data[j].length; i++) {
     Name_to_All_Data[Global_Credit_Data[j][i]['name']] = Global_Credit_Data[j][i];
   }
 }
}

function changeSubjectBox(how){
  if(how === "spec"){
    for (bt in buttons){
      flag = 0;
      for(i in Global_Grade_Name) {
        // //console.log(Global_Credit_Data[i].length)
        for(j = 0; j < Global_Credit_Data[i].length; j++) {
          // Global_Credit_Data[grade][j]['pt'] = 0;
          if (Global_Credit_Data[i][j]['name'] === bt){
            col2[Global_Credit_Data[i][j]['spec']].appendChild(buttons[bt]);
            flag = 1;
            break;
          }
        }
        if (flag == 1)break;
      }
    }
    for(i = 0; i < Global_Grade_Id.length; i++){
      col1[Global_Grade_Id[i]].style.display = 'none';
      col2[Global_Grade_Id[i]].style.display = 'none';
    }
    for(i in Search_Spec_Key){
      col1[i].style.display = 'block';
      col2[i].style.display = 'block';
    }
  }
  else if(how === "dep"){
    for (sub in Global_Grade_Name){
      for (i = 0; i < Global_Credit_Data[sub].length; i++){
        col2[sub].appendChild(buttons[Global_Credit_Data[sub][i]['name']]);
      }
    }
    for(i = 0; i < Global_Grade_Id.length; i++){
      col1[Global_Grade_Id[i]].style.display = 'block';
      col2[Global_Grade_Id[i]].style.display = 'block';
    }
    for(i in Search_Spec_Key){
      col1[i].style.display = 'none';
      col2[i].style.display = 'none';
    }
  }
}

function displaySubjects(value){
 onClick();
}

function set_view(flag){
  document.getElementById("Department").disabled = flag;
}

function setError(msg){
  document.getElementById("Error").style.display = 'block'
  document.getElementById("Error").innerHTML = msg;
}

function resetError(){
  document.getElementById("Error").style.display = 'none'
  document.getElementById("Error").innerHTML = '';
}

var credit_color = ['#15cf44', '#21b547', '#2e7d42', '#084718', '#ff8247']

function set_subject_data(mine_name, data){
  for(i of Global_Grade_Id){
    for(j = 0; j < Global_Credit_Data[i].length; j++){
      if(mine_name === Global_Credit_Data[i][j]['name']){
        for(k in data){
          Global_Credit_Data[i][j][k] = data[k];
        }
        return;
      }
    }
  }
}


function make_box(credit_box, class_name, gpa){
  for(var num = 0; num < 5; num++){
    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    checkbox.value = num;
    if(grade.indexOf(gpa) == num){
      checkbox.checked = true;
    }
    checkbox.type = "radio"
    checkbox.id = 'ck'+num.toString()+class_name;
    checkbox.name = 'ck'+class_name;
    var prev = null;
    checkbox.addEventListener('change', function() {
        if (this !== prev) {
            prev = this;
            set_subject_data(class_name, {'gpa':grade[this.value]});
            this.parentElement.parentElement.style['background-color'] = credit_color[parseInt(this.value)];
            Calc();
        }
    });
    label.htmlFor = checkbox.id;
    label.id = 'lb'+checkbox.id;
    label.innerHTML = grade[num];
    label.style = "padding-bottom: 10px;";
    credit_box.appendChild(checkbox)
    credit_box.appendChild(label)
  }
}

function make_buttons(){// add little radio bottons for every subject
  for(i of Global_Grade_Id) {
    for(j = 0; j < Global_Credit_Data[i].length; j++) {
      var credit_box = document.createElement("div");
      credit_box.className = "credit_box";
      make_box(credit_box, Global_Credit_Data[i][j]['name'], Global_Credit_Data[i][j]['gpa']);
      buttons[Global_Credit_Data[i][j]['name']].appendChild(credit_box);
      buttons[Global_Credit_Data[i][j]['name']].style['background-color'] = credit_color[grade.indexOf(Global_Credit_Data[i][j]['gpa'])];
    }
  }
}



function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

function categorize_subjects(){// create subject buttons
  var subjects_button = document.getElementById("subjects_area");
  for(i in col2){
    col2[i].querySelectorAll('*').forEach(n => n.remove());
  }
  buttons = {}
  for (sub in Global_Grade_Name){
    for (i = 0; i < Global_Credit_Data[sub].length; i++){
      var button = document.createElement("div");
      button.innerHTML = Global_Credit_Data[sub][i]['name'];
      button.className = "subject_button";
      if(Global_Credit_Data[sub][i]['condition'] === '必修' ){
        button.style["border-style"] = 'solid';
        button.style["border-color"] = '#ed1c1c';
      }
      buttons[Global_Credit_Data[sub][i]['name']] = button;
    }
  }
  make_buttons();
  changeSubjectBox(document.getElementById("SubjectDisplay").value);
}


function onClick(){
  // 入力を一時的にフリーズする
  if(document.getElementById("Department").value == 'default'){
    return;
  }
  set_view(true);
  resetError();
  if (Object.keys(Global_Credit_Data).length === 0 || confirm('データが削除されます。このまま進んでよろしいですか？')) {
  } else {
    return;
  }
  document.getElementById("searching").style.display = "block";

  resetError();
  init_dashboard_data(cmacs_data[document.getElementById("Department").value], false);
  set_view(false);
  document.getElementById("searching").style.display = "none";
}


// ページがロードし終えたとき
$(document).ready(function(){
  var subjects_button = document.getElementById("subjects_area");
  for(i = 0; i < Global_Grade_Id.length; i++){
    var c1 = document.createElement("div");
    c1.className = "column";
    c1.style = "width: auto;text-align:center;"
    c1.innerHTML = Global_Grade_Name[Global_Grade_Id[i]];
    c1.style.display = 'none';
    col1[Global_Grade_Id[i]] = c1;
    var c2 = document.createElement("div");
    c2.className = "column";
    c2.style = "position: relative; margin-bottom: 5%;";
    c2.style.display = 'none';
    col2[Global_Grade_Id[i]] = c2;
    row1.appendChild(col1[Global_Grade_Id[i]]);
    row1.appendChild(col2[Global_Grade_Id[i]]);
    subjects_button.appendChild(row1);
  }
  for(i in Search_Spec_Key){
    var c1 = document.createElement("div");
    c1.className = "column";
    c1.style = "width: auto;text-align:center;"
    c1.innerHTML = Search_Spec_Key[i];
    c1.style.display = 'none';
    col1[i] = c1;
    var c2 = document.createElement("div");
    c2.className = "column";
    c2.style = "position: relative; margin-bottom: 5%;";
    c2.style.display = 'none';
    col2[i] = c2;
    row1.appendChild(col1[i]);
    row1.appendChild(col2[i]);
    subjects_button.appendChild(row1);
  }

  document.getElementById("uploadExcel")
    .addEventListener("change", function(event) {
      uploadExcel(event.target.files[0]);
  });

});


function logout_from_dashboard(redirect){
  if (Object.keys(Global_Credit_Data).length === 0 || confirm('データが削除されます。このまま進んでよろしいですか？')) {
  } else {
    return;
  }
  location.replace(redirect);
}
