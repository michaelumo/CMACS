var Main_Data = {};
var Global_Grade_Id = ['s2','s1','5','4']
var JABEE_Comp = {'A':'科学と工学の専門知識(20単位以上かつGPA&#8807;2.0)','B':'問題解決能力とチームワーク(必修科目の評価&#8807;60%)','C':'数学と自然科学(12単位以上かつGPA&#8807;2.0)','D':'技術者倫理(4単位以上かつGPA&#8807;2.0)'};
var Edu_Comp = ['専攻科合計単位(62単位以上)', '人文科学・社会科学(10単位以上)', '数学・自然科学・情報技術(10単位以上)', '専門工学分野(36単位以上)', '基礎工学①〜⑤(それぞれから1科目以上, 計6単位以上)', '指定の必修6科目(12単位以上)'];
const subject_to_js = {'電気電子創造工学':'ee', '建築学':'a', '機械工学':'m', '物質工学':'c'}
var subject_row = document.createElement("div");
var uncat_subject_row = document.createElement("div");
subject_row.className = "row";
subject_row.style = "padding-top: 10px; padding-left: 5%;"
uncat_subject_row.className = "row";
uncat_subject_row.style = "padding-top: 10px; padding-left: 5%;"
var Global_Grade_Name = {'s2':'専攻科2年','s1':'専攻科1年','5':'本科5年','4':'本科4年'}
var initialised = false;
var subjects_init = false;

var jabee_col = [{},{}]
var edu_col = [{},{}]
var unsub_col = [{},{}]
var buttons = {}


function init_controlboard_data(data, from_excel){
  Main_Data = data;
  categorize_subjects();
  // update_all_subject_display(document.getElementById("SubjectDisplay").value);
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
        init_controlboard_data(data, true);
      }
    };
    fileReader.readAsBinaryString(selectedFile);
  }
}

function downloadExcel() {
  /* create a new blank workbook */
  var wb = XLSX.utils.book_new();
  for(i in Main_Data){
    /* create a worksheet for subjects */
    var ws = XLSX.utils.json_to_sheet(Main_Data[i]);
    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(wb, ws, i);
  }
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data1 = new Blob([excelBuffer], { type: fileType });
  saveAs(data1, "cmacs_data.xlsx");
}

function downloadJS() {
  const data = "cmacs_data['"+document.getElementById("Department").value+"'] = "+JSON.stringify(Main_Data);
  const fileType = 'application/javascript;charset=UTF-8';
  const data1 = new Blob([data], { type: fileType });
  saveAs(data1, subject_to_js[document.getElementById("Department").value]+"_data.js");
}


function changeSubjectBox(how){
  if(initialised === false)return;
  // update_all_subject_display(how);
  // }
  if(how === "edu"){
    for(i in JABEE_Comp){
      jabee_col[0][i].style.display = 'none';
      jabee_col[1][i].style.display = 'none';
    }
    for(i = 0; i < Edu_Comp.length; i++){
      edu_col[0][(i+1).toString()].style.display = 'block';
      edu_col[1][(i+1).toString()].style.display = 'block';
    }
  }
  else if(how === "jabee"){
    for(i in JABEE_Comp){
      jabee_col[0][i].style.display = 'block';
      jabee_col[1][i].style.display = 'block';
    }
    for(i = 0; i < Edu_Comp.length; i++){
      edu_col[0][(i+1).toString()].style.display = 'none';
      edu_col[1][(i+1).toString()].style.display = 'none';
    }
  }
}

function make_box(credit_box, class_name, grade){
  for(var num = 0; num < grade.length; num++){
    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    checkbox.value = grade[num];
    checkbox.type = "radio"
    checkbox.id = 'ck'+num.toString()+class_name;
    checkbox.name = 'ck'+class_name;
    var prev = null;
    checkbox.addEventListener('change', function() {
        if (this !== prev) {
            prev = this;
            var k = document.getElementById("SubjectDisplay").value;
            if(k === "jabee"){
              // set_subject_data(this.parentElement.parentElement.name, {"jabee":this.value});
            }
            else if(k === "edu"){
              // set_subject_data(this.parentElement.parentElement.name, {"edu":this.value});
            }
            this.parentElement.style.display = "none";
            // update_subject_display(this.parentElement.parentElement.name, k, this.value);
            // update_all_subject_display(k);
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
    for(j = 0; j < Main_Data[i].length; j++) {
      var credit_box = document.createElement("div");
      credit_box.className = "credit_box";
      credit_box.name = "jabee_credit_box";
      var edu_credit_box = document.createElement("div");
      edu_credit_box.className = "credit_box";
      edu_credit_box.name = "edu_credit_box";
      make_box(edu_credit_box, Main_Data[i][j]['name'], ['1','2','3','4','5','6','-']);
      make_box(credit_box, Main_Data[i][j]['name'], ['A','B','C','D','-']);
      buttons[Main_Data[i][j]['name']].appendChild(credit_box);
      buttons[Main_Data[i][j]['name']].appendChild(edu_credit_box);

      buttons[Main_Data[i][j]['name']].addEventListener('mouseover', function(e) {
        if(document.getElementById("SubjectDisplay").value === "jabee"){
          this.children[0].style.display = 'block';
          this.children[1].style.display = 'none';
        }
        else if(document.getElementById("SubjectDisplay").value === "edu"){
          this.children[0].style.display = 'none';
          this.children[1].style.display = 'block';
        }
      })
      buttons[Main_Data[i][j]['name']].addEventListener('mouseout', function(e) {
        this.children[0].style.display = 'none';
        this.children[1].style.display = 'none';
      })
    }
  }
}

function categorize_subjects(){// create subject buttons
  var subjects_button = document.getElementById("uncategorized_subjects_area");
  for(i in jabee_col[1]){
    jabee_col[1][i].querySelectorAll('*').forEach(n => n.remove());
  }
  for(i = 0; i < Edu_Comp.length; i++){
    edu_col[1][(i+1).toString()].querySelectorAll('*').forEach(n => n.remove());
  }
  unsub_col[1].querySelectorAll('*').forEach(n => n.remove());
  buttons = {}
  for (sub in Global_Grade_Name){
    for (i = 0; i < Main_Data[sub].length; i++){
      var button = document.createElement("div");
      button.innerHTML = Main_Data[sub][i]['name'];
      button.className = "subject_button";
      button.name = Main_Data[sub][i]['name'];
      if(Main_Data[sub][i]['condition'] === '必修' ){
        button.style["border-style"] = 'solid';
        button.style["border-color"] = '#ed1c1c';
      }
      buttons[Main_Data[sub][i]['name']] = button;
    }
  }
  make_buttons();
  for (bt in buttons){
    flag = 0;
    for(i of Global_Grade_Id){
      for(j = 0; j < Main_Data[i].length; j++) {
        if (Main_Data[i][j]['name'] === bt){
          unsub_col[1].appendChild(buttons[bt]);
          flag = 1;
          break;
        }
      }
      if (flag == 1)break;
    }
  }
  changeSubjectBox(document.getElementById("SubjectDisplay").value);
  subjects_init = true;
}

function display_subjects(value){
 get_data();
}

function get_data(){
  // 入力を一時的にフリーズする
  if(document.getElementById("Department").value == 'default'){
    return;
  }
  set_view(true);
  resetError();
  if (Object.keys(Main_Data).length === 0 || confirm('データが削除されます。このまま進んでよろしいですか？')) {
  } else {
    return;
  }
  document.getElementById("searching").style.display = "block";

  resetError();
  init_controlboard_data(cmacs_data[document.getElementById("Department").value], false);
  set_view(false);
  document.getElementById("searching").style.display = "none";
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


$(document).ready(function(){
  var subjects_button = document.getElementById("subjects_area");
  var uncategorized_subjects_area = document.getElementById("uncategorized_subjects_area");

  for(i in JABEE_Comp){
    var c1 = document.createElement("div");
    c1.className = "column";
    c1.style = "width: auto;text-align:center;"
    c1.innerHTML = i+". "+JABEE_Comp[i];
    c1.style.display = 'none';
    jabee_col[0][i] = c1;// Where the name tag is
    var c2 = document.createElement("div");
    c2.className = "column";
    c2.style = "position: relative; margin-bottom: 5%;";
    c2.style.display = 'none';
    jabee_col[1][i] = c2;// Where the subject buttons go
    subject_row.appendChild(jabee_col[0][i]);
    subject_row.appendChild(jabee_col[1][i]);
    subjects_button.appendChild(subject_row);
  }
  console.log(jabee_col)

  for(i = 0; i < Edu_Comp.length; i++){
    var c1 = document.createElement("div");
    c1.className = "column";
    c1.style = "width: auto;text-align:center;"
    c1.innerHTML = (i+1).toString()+". "+Edu_Comp[i];
    c1.style.display = 'none';
    edu_col[0][(i+1).toString()] = c1;
    var c2 = document.createElement("div");
    c2.className = "column";
    c2.style = "position: relative; margin-bottom: 5%;";
    c2.style.display = 'none';
    edu_col[1][(i+1).toString()] = c2;
    subject_row.appendChild(edu_col[0][(i+1).toString()]);
    subject_row.appendChild(edu_col[1][(i+1).toString()]);
    subjects_button.appendChild(subject_row);
  }
  var c1 = document.createElement("div");
  c1.className = "column";
  c1.style = "width: auto;text-align:center;"
  c1.innerHTML = '教科';
  c1.style.display = 'block';
  unsub_col[0] = c1;
  var c2 = document.createElement("div");
  c2.className = "column";
  c2.style = "position: relative; margin-bottom: 5%;";
  c2.style.display = 'block';
  unsub_col[1] = c2;
  changeSubjectBox('edu')
  uncat_subject_row.appendChild(unsub_col[0]);
  uncat_subject_row.appendChild(unsub_col[1]);
  uncategorized_subjects_area.appendChild(uncat_subject_row);
  initialised = true;

  document.getElementById("uploadExcel")
    .addEventListener("change", function(event) {
      uploadExcel(event.target.files[0]);
  });
});
