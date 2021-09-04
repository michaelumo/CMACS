
var Credit_Score = {}
var Global_JABEE_Radar_Chart = new Array();
const jabee_id = ['A','B','C','D','-'];
const edu_id = ['1','2','3','4','5','6','-'];

var edu_pt = {}
var edu_num = {}
var edu_spec = {}
var jabee_pt = {}
var jabee_gpa = {}
var jabee_num = {}
var jabee_total_num = {}

function reset_sums(){
  for(i of edu_id){
    edu_pt[i] = 0;
    edu_num[i] = 0;
    edu_spec[i] = [];
  }
  for(i of jabee_id){
    jabee_pt[i] = 0;
    jabee_num[i] = 0;
    jabee_total_num[i] = 0;
    jabee_gpa[i] = 0;
  }
}

function add_subject_to_edu(name, edu, pt){
  var points = document.getElementsByName('ck'+name);
  for (f = 0; f < points.length; f++) {
    if (points[f].checked && 4-points[f].value > 0) {
      edu_num[edu] += 1;
      edu_pt[edu] += pt;
      break;
    }
  }
}

function add_subject_to_jabee(name, jabee, pt){
  var points = document.getElementsByName('ck'+name);
  for (f = 0; f < points.length; f++) {
    if (points[f].checked && 4-points[f].value > 0) {
      jabee_num[jabee] += 1;
      jabee_gpa[jabee] += 4-points[f].value;
      jabee_pt[jabee] += pt;
      break;
    }
  }
}

function Calc(){
  reset_sums();
  for(i of Global_Grade_Id){
    for(j = 0; j < Global_Credit_Data[i].length; j++){
      const tmp_name = Global_Credit_Data[i][j]['name']
      const tmp_edu = Global_Credit_Data[i][j]['edu']
      const tmp_jabee = Global_Credit_Data[i][j]['jabee']
      const tmp_pt = Global_Credit_Data[i][j]['pt']
      if(tmp_edu != '-'){
        for(var s of tmp_edu){
          add_subject_to_edu(tmp_name, s, tmp_pt);
          edu_spec[s].push(Global_Credit_Data[i][j]['spec'])
        }
      }
      if(tmp_jabee != '-'){
        for(var s of tmp_jabee){
          jabee_total_num[s] += 1
          add_subject_to_jabee(tmp_name, s, tmp_pt);
        }
      }
      Global_Credit_Data[i][j]['jabee']
    }
  }
  for(i in jabee_gpa){
    if(jabee_num[i] !== 0){
      jabee_gpa[i] = jabee_gpa[i]/jabee_num[i]
    }
  }
  JABEE_A('A');
  JABEE_B('B');
  JABEE_C('C');
  JABEE_D('D');
  JABEE_E();
  Program_1('1');
  Program_2('2');
  Program_3('3');
  Program_4('4');
  Program_5('5');
  Program_6('6');
}

function clear_chart(){
  var with_gpa = ['A','C','D'];
  var with_credit = ['A','B','C','D'];
  for(i = 0; i < with_gpa.length; i++){
    var id = with_gpa[i];
    var gpa = document.getElementById('jabee_'+id+'_GPA');
    gpa.children[0].style = 'width:'+(0).toString()+'%';
    gpa.children[0].innerHTML = 0;
  }
  for(i = 0; i < with_credit.length; i++){
    var id = with_credit[i];
    var pt = document.getElementById('jabee_'+id+'_PT');
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = 0;
  }
  for(i = 1; i < 7; i++){
    var id = i.toString();
    var pt = document.getElementById('program_'+id+'_PT');
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = 0;
  }
}

function JABEE_A(pos){
  var gpa = document.getElementById('jabee_A_GPA');
  var pt = document.getElementById('jabee_A_PT');
  if(jabee_num[pos]){
    gpa.children[0].style = 'width:'+(jabee_gpa[pos]/4*100).toFixed(2).toString()+'%';
    gpa.children[0].innerHTML = (jabee_gpa[pos]).toFixed(2);
    pt.children[0].style = 'width:'+(jabee_pt[pos]/20*100).toFixed(2).toString()+'%';
    pt.children[0].innerHTML = jabee_pt[pos];
    if(jabee_gpa[pos] >= 2.0){gpa.children[0].style["background-color"] = '#0c0'}
    else {gpa.children[0].style["background-color"] = '#f55151'}
    if(jabee_pt[pos] >= 20.0){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('JABEE_A:');
    //console.log(edu_pt[pos]);
    //console.log(total_GP);
    //console.log(total_GP/num);
  }else{
    gpa.children[0].style.width = (0).toString()+'%';
    gpa.children[0].innerHTML = (0).toFixed(2);
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = 0;
  }
}

function JABEE_B(pos){
  var pt = document.getElementById('jabee_B_PT');
  if(jabee_num[pos]){
    pt.children[0].style = 'width:'+(jabee_num[pos]/jabee_total_num[pos]*100).toFixed(1).toString()+'%';
    pt.children[0].innerHTML = (jabee_num[pos]/jabee_total_num[pos]*100).toFixed(1).toString()+'%';
    if(jabee_num[pos]/jabee_total_num[pos] >= 1.0){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('JABEE_B:');
    //console.log(num/total_num*100);
  }else{
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = (0).toString()+'%';
  }
}

function JABEE_C(pos){
  var gpa = document.getElementById('jabee_C_GPA');
  var pt = document.getElementById('jabee_C_PT');
  if(jabee_num[pos]){
    gpa.children[0].style = 'width:'+(jabee_gpa[pos]/4*100).toFixed(2).toString()+'%';
    gpa.children[0].innerHTML = (jabee_gpa[pos]).toFixed(2);
    pt.children[0].style = 'width:'+(jabee_pt[pos]/12*100).toFixed(2).toString()+'%';
    pt.children[0].innerHTML = jabee_pt[pos];
    if(jabee_gpa[pos] >= 2.0){gpa.children[0].style["background-color"] = '#0c0'}
    else {gpa.children[0].style["background-color"] = '#f55151'}
    if(jabee_pt[pos] >= 12.0){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
  }else{
    gpa.children[0].style.width = (0).toString()+'%';
    gpa.children[0].innerHTML = (0).toFixed(2);
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = 0;
  }
}

function JABEE_D(pos){
  var gpa = document.getElementById('jabee_D_GPA');
  var pt = document.getElementById('jabee_D_PT');
  if(jabee_num[pos]){
    gpa.children[0].style.width = (jabee_gpa[pos]/4*100).toFixed(2).toString()+'%';
    gpa.children[0].innerHTML = (jabee_gpa[pos]).toFixed(2);
    pt.children[0].style = 'width:'+(jabee_pt[pos]/4*100).toFixed(2).toString()+'%';
    pt.children[0].innerHTML = jabee_pt[pos];
    if(jabee_gpa[pos] >= 2.0){gpa.children[0].style["background-color"] = '#0c0'}
    else {gpa.children[0].style["background-color"] = '#f55151'}
    if(jabee_pt[pos] >= 4.0){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
  }else{
    gpa.children[0].style.width = (0).toString()+'%';
    gpa.children[0].innerHTML = (0).toFixed(2);
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = 0;
  }
}

function JABEE_E(){
  var score = document.getElementById("toeic_score").value;
  if(!isNaN(score)){
    var pt = document.getElementById('jabee_E_PT');
    pt.children[0].style = 'width:'+(score/400*100).toFixed(2).toString()+'%';
    pt.children[0].innerHTML = score;
    if(score >= 400){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('JABEE_E:');
    //console.log(score);
  }
}


function Program_1(pos){
  var pt = document.getElementById('program_1_PT');
  pt.children[0].style = 'width:'+(edu_pt[pos]/62*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = edu_pt[pos];
  if(edu_pt[pos] >= 62.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
}

function Program_2(pos){
  var pt = document.getElementById('program_2_PT');
  pt.children[0].style = 'width:'+(edu_pt[pos]/10*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = edu_pt[pos];
  if(edu_pt[pos] >= 10.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
}

function Program_3(pos){
  var pt = document.getElementById('program_3_PT');
  pt.children[0].style = 'width:'+(edu_pt[pos]/10*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = edu_pt[pos];
  if(edu_pt[pos] >= 10.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
}

function Program_4(pos){
  var pt = document.getElementById('program_4_PT');
  pt.children[0].style = 'width:'+(edu_pt[pos]/36*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = edu_pt[pos];
  if(edu_pt[pos] >= 36.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
}

function Program_5(pos){
  var main_ids = ['C', 'D', 'E', 'F', 'G'];
  var pt = document.getElementById('program_5_PT');
  pt.children[0].style = 'width:'+(edu_pt[pos]/6*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = edu_pt[pos];
  // 1から5まで少なくとも1つ修得
  var tmp = []
  var inner_num = 0;
  for(var i of edu_spec[pos]){
    if(!tmp.includes(i) && main_ids.includes(i)){
      inner_num += 1;
      tmp.push(i);
    }
  }
  if(inner_num >= 5 && edu_pt[pos] >= 6){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
}


function Program_6(pos){
  var pt = document.getElementById('program_6_PT');
  pt.children[0].style = 'width:'+(edu_pt[pos]/12*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = edu_pt[pos];
  if(edu_pt[pos] >= 12.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
}
