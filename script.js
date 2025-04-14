document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const titleInput = document.getElementById("titleInput");
  const subtitleInput = document.getElementById("subtitleInput");
  const itemList = document.getElementById("itemList");

  //localsstorageから保存済みのリストを取得
  let savedList = JSON.parse(localStorage.getItem("savedItems")) || [];

  //保存関数
  function saveList(){
    localStorage.setItem("savedItems", JSON.stringify(savedList));
  }

  //表示関数
  function renderList(){
    itemList.innerHTML = ""; //一旦リストをクリア
    savedList.forEach(item =>{
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.title}</strong><br><small>${item.subtitle}</small>`;
      itemList.appendChild(li, itemList.firstChild);
    });    
  }

  addButton.addEventListener("click", function () {
    const title = titleInput.value;
    const subtitle = subtitleInput.value;

    if (title || subtitle) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${title}</strong><br><small>${subtitle}</small>`;
      itemList.appendChild(li);
      const newItem = { title, subtitle };//変数追加
      savedList.unshift(newItem);//配列に追加
      saveList();             //localStorageに保存
      renderList();           //表示を更新

      titleInput.value = "";
      subtitleInput.value = "";
    }
  });

  //初回ページ読み込み時にリストを表示
  renderList();
});