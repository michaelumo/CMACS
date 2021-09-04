
var Credit_Score = {}
var Global_JABEE_Radar_Chart = new Array();

function Calc(){
  //console.log();
  for(i =0; i < Spec_to_Name['H'].length; i++){
    //console.log(Name_to_All_Data[Spec_to_Name['H'][i]]);
  }
  JABEE_A();
  JABEE_B();
  JABEE_C();
  JABEE_D();
  JABEE_E();
  Program_1();
  Program_2();
  Program_3();
  Program_4();
  Program_5();
  Program_6();
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

// function init_chart(){
//   Global_JABEE_Radar_Chart.push(
//     new Chart(document.getElementById("radar-chart"), {
//         type: 'radar',
//         data: {
//           labels: JABEE_Radar,
//           datasets: [
//             {
//               backgroundColor: 'rgba(255, 130, 71, 0.6)',
//               // label: "Population (millions)",
//               // pointBackgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//               data: [0,0,0,0,0]
//             }
//           ]
//         },
//         options: {
//           // legend: {
//           //     display: true,
//           //     text: 'test',
//           //     labels: {
//           //         fontColor: 'rgb(255, 99, 132)'
//           //     }
//           // },
//           // dataLabel: { pointLabelFontSize: 26 },
//           scale: {
//             pointLabels: {
//                 fontSize: 16,
//             },
//             ticks: {
//               backdropColor: 'rgba(0,0,0,0)',
//               // backgroundColor: 'rgba(255, 130, 71, 0.6)',
//                 beginAtZero: true,
//                 max: 4,
//                 min: 0,
//                 stepSize: 1
//             }
//           },
//           legend: { display: false },
//           title: {
//             display: true,
//             text: 'JABEE スコア'
//           }
//         }
//     }));
// }

// function get_subject_data(mine_name, data){
//   for(i in Global_Credit_Data){
//     for(j = 0; j < Global_Credit_Data[i].length; j++){
//       if(mine_name === Global_Credit_Data[i][j]['name']){
//         var ret = []
//         for(k in data){
//           ret.push(Global_Credit_Data[i][j][k]);
//         }
//         return ret;
//       }
//     }
//   }
// }

function JABEE_A(){
  var main_ids = ['D', 'E', 'F', 'H'];
  var total_credits = 0;
  var total_GP = 0;
  var num = 0;
  for (id = 0; id < main_ids.length; id++){
    for(i = 0; i < Spec_to_Name[main_ids[id]].length; i++){
      // points from check mark
      var points = document.getElementsByName('ck'+Spec_to_Name[main_ids[id]][i]);
      for (f = 0; f < points.length; f++) {
        if (points[f].checked && 4-points[f].value > 0) {
          num += 1;
          total_GP += 4-points[f].value;
          total_credits += Name_to_All_Data[Spec_to_Name[main_ids[id]][i]]['pt'];
          break;
        }
      }
    }
  }
  var gpa = document.getElementById('jabee_A_GPA');
  var pt = document.getElementById('jabee_A_PT');
  if(num){
    gpa.children[0].style = 'width:'+(total_GP/num/4*100).toFixed(2).toString()+'%';
    gpa.children[0].innerHTML = (total_GP/num).toFixed(2);
    pt.children[0].style = 'width:'+(total_credits/20*100).toFixed(2).toString()+'%';
    pt.children[0].innerHTML = total_credits;
    if(total_GP/num >= 2.0){gpa.children[0].style["background-color"] = '#0c0'}
    else {gpa.children[0].style["background-color"] = '#f55151'}
    if(total_credits >= 20.0){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('JABEE_A:');
    //console.log(total_credits);
    //console.log(total_GP);
    //console.log(total_GP/num);
  }else{
    gpa.children[0].style.width = (0).toString()+'%';
    gpa.children[0].innerHTML = (0).toFixed(2);
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = 0;
  }
}

function JABEE_B(){
  var same_subjects = ['システムデザイン'];
  var num = 0;
  var total_num = 1;
  var id = 'I';
  for(i = 0; i < Spec_to_Name[id].length; i++){
    if(Name_to_All_Data[Spec_to_Name[id][i]]['condition'] === '必修'){
      total_num += 1;
      var points = document.getElementsByName('ck'+Spec_to_Name[id][i]);
      for (f = 0; f < points.length; f++) {
        if (points[f].checked && 4-points[f].value > 0) {
          num += 1;
          break;
        }
      }
    }
  }
  var points = document.getElementsByName('ck'+same_subjects[0]);
  for (f = 0; f < points.length; f++) {
    if (points[f].checked && 4-points[f].value > 0) {
      num += 1;
      break;
    }
  }
  var pt = document.getElementById('jabee_B_PT');
  if(num){
    pt.children[0].style = 'width:'+(num/total_num*100).toFixed(1).toString()+'%';
    pt.children[0].innerHTML = (num/total_num*100).toFixed(1).toString()+'%';
    if(num/total_num >= 1.0){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('JABEE_B:');
    //console.log(num/total_num*100);
  }else{
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = (0).toString()+'%';
  }
}

function JABEE_C(){
  var main_ids = ['B'];
  var total_credits = 0;
  var total_GP = 0;
  var num = 0;
  for (id = 0; id < main_ids.length; id++){
    for(i = 0; i < Spec_to_Name[main_ids[id]].length; i++){
      var points = document.getElementsByName('ck'+Spec_to_Name[main_ids[id]][i]);
      for (f = 0; f < points.length; f++) {
        if (points[f].checked && 4-points[f].value > 0) {
          num += 1;
          total_GP += 4-points[f].value;
          total_credits += Name_to_All_Data[Spec_to_Name[main_ids[id]][i]]['pt'];
          break;
        }
      }
    }
  }
  var gpa = document.getElementById('jabee_C_GPA');
  var pt = document.getElementById('jabee_C_PT');
  if(num){
    gpa.children[0].style = 'width:'+(total_GP/num/4*100).toFixed(2).toString()+'%';
    gpa.children[0].innerHTML = (total_GP/num).toFixed(2);
    pt.children[0].style = 'width:'+(total_credits/12*100).toFixed(2).toString()+'%';
    pt.children[0].innerHTML = total_credits;
    if(total_GP/num >= 2.0){gpa.children[0].style["background-color"] = '#0c0'}
    else {gpa.children[0].style["background-color"] = '#f55151'}
    if(total_credits >= 12.0){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('JABEE_C:');
    //console.log(total_credits);
    //console.log(total_GP);
    //console.log(total_GP/num);
  }else{
    gpa.children[0].style.width = (0).toString()+'%';
    gpa.children[0].innerHTML = (0).toFixed(2);
    pt.children[0].style = 'width:'+(0).toString()+'%';
    pt.children[0].innerHTML = 0;
  }
}

function JABEE_D(){
  var same_subjects = ['人間と科学Ⅰ', '人間と科学Ⅱ'];
  var dep_subjects = {'機械工学コース':['熱力学','水力学Ⅰ','水力学Ⅱ','伝熱工学','エネルギー工学'],
                      '電気電子創造工学コース':['パワーエレクトロニクス','新エネルギー発電',
                      '電力系統工学','高電圧工学','電気法規','環境技術','電磁エネルギー工学','電気エネルギー論'],
                      '物質工学コース':['環境化学Ⅰ','環境化学Ⅱ','生物資源工学'],
                      '建築学コース':['建築設備','環境デザイン論','設備システム論']};
  var total_credits = 0;
  var total_GP = 0;
  var num = 0;
  var dep = document.getElementById("Department").value+'コース';
  var current_dep_subjects = {'H':dep_subjects[dep], 'A':same_subjects};
  for (id in current_dep_subjects){
    console.log(id)
    console.log(current_dep_subjects)
    for(i = 0; i < Spec_to_Name[id].length; i++){
      for (j = 0; j < current_dep_subjects[id].length; j++){
        if(current_dep_subjects[id][j] === Spec_to_Name[id][i]){
          var points = document.getElementsByName('ck'+Spec_to_Name[id][i]);
          for (f = 0; f < points.length; f++) {
            if (points[f].checked && 4-points[f].value > 0) {
              num += 1;
              total_GP += 4-points[f].value;
              total_credits += Name_to_All_Data[Spec_to_Name[id][i]]['pt'];
              break;
            }
          }
        }
      }
    }
  }
  var gpa = document.getElementById('jabee_D_GPA');
  var pt = document.getElementById('jabee_D_PT');
  if(num){
    gpa.children[0].style.width = (total_GP/num/4*100).toFixed(2).toString()+'%';
    gpa.children[0].innerHTML = (total_GP/num).toFixed(2);
    pt.children[0].style = 'width:'+(total_credits/4*100).toFixed(2).toString()+'%';
    pt.children[0].innerHTML = total_credits;
    if(total_GP/num >= 2.0){gpa.children[0].style["background-color"] = '#0c0'}
    else {gpa.children[0].style["background-color"] = '#f55151'}
    if(total_credits >= 4.0){pt.children[0].style["background-color"] = '#0c0'}
    else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('JABEE_D:');
    //console.log(total_credits);
    //console.log(total_GP);
    //console.log(total_GP/num);
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


function Program_1(){
  var total_credits = 0;
  var num = 0;

  for (id in Global_Credit_Data['body']){
    if (id === 's1' || id === 's2'){
      for(i = 0; i < Global_Credit_Data['body'][id].length; i++){
        var points = document.getElementsByName('ck'+Global_Credit_Data['body'][id][i]['name']);
        for (f = 0; f < points.length; f++) {
          if (points[f].checked && 4-points[f].value > 0) {
            num += 1;
            total_credits += Global_Credit_Data['body'][id][i]['pt'];
            break;
          }
        }
      }
    }
  }
  // if(num){
  var pt = document.getElementById('program_1_PT');
  pt.children[0].style = 'width:'+(total_credits/62*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = total_credits;
  if(total_credits >= 62.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('Program_1:');
    //console.log(total_credits);
  // }
}

function Program_2(){
  var total_credits = 0;
  var num = 0;
  var id = 'A';
  for(i = 0; i < Spec_to_Name[id].length; i++){
    var points = document.getElementsByName('ck'+Spec_to_Name[id][i]);
    for (f = 0; f < points.length; f++) {
      if (points[f].checked && 4-points[f].value > 0) {
        num += 1;
        total_credits += Name_to_All_Data[Spec_to_Name[id][i]]['pt'];
        break;
      }
    }
  }
  // if(num){
  var pt = document.getElementById('program_2_PT');
  pt.children[0].style = 'width:'+(total_credits/10*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = total_credits;
  if(total_credits >= 10.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('Program_2:');
    //console.log(total_credits);
  // }
}

function Program_3(){
  var total_credits = 0;
  var num = 0;
  var id = 'B';
  for(i = 0; i < Spec_to_Name[id].length; i++){
    var points = document.getElementsByName('ck'+Spec_to_Name[id][i]);
    for (f = 0; f < points.length; f++) {
      if (points[f].checked && 4-points[f].value > 0) {
        num += 1;
        total_credits += Name_to_All_Data[Spec_to_Name[id][i]]['pt'];
        break;
      }
    }
  }
  // if(num){
  var pt = document.getElementById('program_3_PT');
  pt.children[0].style = 'width:'+(total_credits/10*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = total_credits;
  if(total_credits >= 10.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('Program_3:');
    //console.log(total_credits);
  // }
}

function Program_4(){
  var total_credits = 0;
  var num = 0;
  var main_ids = ['H', 'I'];
  var id = 'H';
  for (j = 0; j < main_ids.length; j++){
    var id = main_ids[j];
    for(i = 0; i < Spec_to_Name[id].length; i++){
      var points = document.getElementsByName('ck'+Spec_to_Name[id][i]);
      for (f = 0; f < points.length; f++) {
        if (points[f].checked && 4-points[f].value > 0) {
          num += 1;
          total_credits += Name_to_All_Data[Spec_to_Name[id][i]]['pt'];
          break;
        }
      }
    }
  }
  // if(num){
  var pt = document.getElementById('program_4_PT');
  pt.children[0].style = 'width:'+(total_credits/36*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = total_credits;
  if(total_credits >= 36.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('Program_4:');
    //console.log(total_credits);
  // }
}

function Program_5(){
  var main_ids = ['C', 'D', 'E', 'F', 'G'];
  var total_credits = 0;
  var inner_num = 0;
  var inner_flag = 0;
  var num = 0;
  for (ir = 0; ir < main_ids.length; ir++){
    var id = main_ids[ir];
    for(i = 0; i < Spec_to_Name[id].length; i++){
      var points = document.getElementsByName('ck'+Spec_to_Name[id][i]);
      for (f = 0; f < points.length; f++) {
        if (points[f].checked && 4-points[f].value > 0) {
          num += 1;
          if(points.length > 0){inner_flag = 1;}
          total_credits += Name_to_All_Data[Spec_to_Name[id][i]]['pt'];
          break;
        }
      }
    }
    if(inner_flag == 1){
      inner_num +=1;
      inner_flag = 0;
    }
  }
  // if(num){
  var pt = document.getElementById('program_5_PT');
  pt.children[0].style = 'width:'+(total_credits/6*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = total_credits;
  if(inner_num >= 5 && num >= 6){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
    // console.log('Program_5:');
    // console.log(inner_num);
    // console.log(num);
  // }
}


function Program_6(){
  var same_subjects = ['システムデザイン','環境技術','技術者倫理','経営工学','プロジェクトデザイン','産業財産権'];
  var total_credits = 0;
  var num = 0;
  var dep = document.getElementById("Department").value+'コース';
  for (j = 0; j < same_subjects.length; j++){
    var points = document.getElementsByName('ck'+same_subjects[j]);
    for (f = 0; f < points.length; f++) {
      if (points[f].checked && 4-points[f].value > 0) {
        num += 1;
        total_credits += Name_to_All_Data[same_subjects[j]]['pt'];
        break;
      }
    }
  }
  // if(num){
  var pt = document.getElementById('program_6_PT');
  pt.children[0].style = 'width:'+(total_credits/12*100).toFixed(2).toString()+'%';
  pt.children[0].innerHTML = total_credits;
  if(total_credits >= 12.0){pt.children[0].style["background-color"] = '#0c0'}
  else {pt.children[0].style["background-color"] = '#f55151'}
    //console.log('Program_6:');
    //console.log(total_credits);
  // }
}
