
function set_subject_data(mine_name, data){
  for(i of Global_Grade_Id){
    for(j = 0; j < Main_Data[i].length; j++){
      if(mine_name === Main_Data[i][j]['name']){
        for(k in data){
          Main_Data[i][j][k] = data[k];
        }
        return;
      }
    }
  }
}

function update_all_subject_display(pos){
  for(bt in buttons){
    var flag = 0;
    for(i of Global_Grade_Id){
      for(j = 0; j < Main_Data[i].length; j++) {
        if (Main_Data[i][j]['name'] === bt){
          update_subject_display(Main_Data[i][j]["name"], pos, Main_Data[i][j][pos]);
          flag = 1;
          break;
        }
      }
      if (flag == 1)break;
    }
  }
}

function update_subject_display(mine_name, pos, data){
  // unsub
  for(i = 0; i < unsub_col[1].children.length; i++){
    if(unsub_col[1].children[i].name === mine_name){
      if(data === "-"){
        unsub_col[1].appendChild(unsub_col[1].children[i]);
      }
      else if(pos === "jabee"){
        jabee_col[1][data].appendChild(unsub_col[1].children[i]);
      }
      else if(pos === "edu"){
        edu_col[1][data].appendChild(unsub_col[1].children[i]);
      }
      return;
    }
  }
  // jabee
  for(j in jabee_col[1]){
    for(i = 0; i < jabee_col[1][j].children.length; i++){
      if(jabee_col[1][j].children[i].name === mine_name){
        if(data === "-"){
          unsub_col[1].appendChild(jabee_col[1][j].children[i]);
        }
        else if(pos === "jabee"){
          jabee_col[1][data].appendChild(jabee_col[1][j].children[i]);
        }
        else if(pos === "edu"){
          edu_col[1][data].appendChild(jabee_col[1][j].children[i]);
        }
        return;
      }
    }
  }
  // edu
  for(j in edu_col[1]){
    for(i = 0; i < edu_col[1][j].children.length; i++){
      if(edu_col[1][j].children[i].name === mine_name){
        if(data === "-"){
            unsub_col[1].appendChild(edu_col[1][j].children[i]);
        }
        else if(pos === "jabee"){
          jabee_col[1][data].appendChild(edu_col[1][j].children[i]);
        }
        else if(pos === "edu"){
          edu_col[1][data].appendChild(edu_col[1][j].children[i]);
        }
        return;
      }
    }
  }
}
