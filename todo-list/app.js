const cardBody1 = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
let counter
const ul = document.querySelector(".list-group");


//bu fonksiyon ekleme formuna basılınca yapılacak işlemler için
document.querySelector("#add-todo").addEventListener("submit", addButton)
function addButton(e) {
    e.preventDefault();
    const inputAdd = document.querySelector("#input-add").value

    if (!inputControl(inputAdd)) { //inputcontrol false dönerse diğer işlemleri yapmasın
        return;
    }
    listItemAdd(inputAdd)
    localStorageAdd(inputAdd)
    document.querySelector("#input-add").value = ""; //ekleme yaptıktan sonra input alanın temizlenmesi için


}

//burada input değerini alıp dolu olup olmadığına bakılıyor
function inputControl(inputAdd) {
    //input'un içi boş veya dolu ise showAlert fonksiyonu ile farklı uyarılar gösterilsin
    if (inputAdd.trim() === "") {
        showAlert("danger", "Lütfen giriş Alanını Boş Bırakmayın")
        return false; // addButton fonksiyonunda kullanabilmek için return değer dönüyor
    } else {
        showAlert("success", "Listenize Başarıyla Eklenmiştir");
        return true;
    }
}

//liste elemanları dinamik olarak oluşturuldu ve liste elemanlarını tek tek kaldırılması burada tanımlandı
function listItemAdd(todo) {
    const li = document.createElement("li");
    li.className = "list-group-item mt-4";

    const a = document.createElement("a");
    a.href = "#";
    a.className = "item-delete d-flex justify-content-between link-underline link-underline-opacity-0";
    a.textContent = todo;
    

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    ul.appendChild(li);
    li.appendChild(a);
    a.appendChild(i);

    //i'ye(çarpı iconu) kaldırılması için click eventi veriliyor
    i.addEventListener("click", function () {
        removeItem(li);
        removeLocalStorage(todo);
        showAlert("success", "Todo Başarıyla Kaldırıldı"
        )
    })

}

//girilen input değerini localstorage'ye ekleme işlemi 
function localStorageAdd(inputAdd) {
    if (localStorage != null) { //localstorage boş değilse countere bir sonraki değer için olan key değeri verildi
        counter = localStorage.length;
    }
    else {
        counter = 0;  //boş ise counter(key) sıfırdan başlasın
    }

    localStorage.setItem(counter, inputAdd);

}

//uyarı mesajları için fonksiyon. type: uyarının danger mi success mi olduğunu almak için.
function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type} mt-3`;
    div.role = "alert";
    div.textContent = message;
    cardBody1.appendChild(div);

    setTimeout(function () { //alert 2 saniye sonra kendiliğinden kaybolur
        div.remove();
    }, 2000);

    //     <div class="alert alert-success" role="alert">
    //   MESSAGE
    // </div>
}
//sayfa yüklendiğinde locakstorage'de önceden var ise var olan ögeleri göstermek için
window.onload = function () {
    if (localStorage != null) {
        localstorageItem()
    }
}

function localstorageItem() {  //localstorage içindeki ögeleri for döngüsü ile tek tek alıp listItemAdd ile ekrana yazdırma
    for (let i = 0; i < localStorage.length; i++) {
        listItemAdd(localStorage.getItem(i));
    }
}

//Arayüzde bulunan liste elemanlarından seçileni kaldırır.listItemAdd fonksiyonunda i click eventinde çağrıldı
function removeItem(li) {
    li.remove();

}

//seçilen liste elemanını localstorage'den kaldırma işlemi ve key değerlerinin tekrar sıralanması.listItemAdd fonksiyonunda i click eventinde çağrıldı
function removeLocalStorage(todo) {
    for (i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i) === todo) {
            localStorage.removeItem(i);

            for (let j = i; j < localStorage.length; j++) {
                const value = localStorage.getItem(j + 1);
                if (value) {
                    localStorage.setItem(j, value);
                    localStorage.removeItem(j + 1)
                }
            }
            break;
        }
    }
}

//Tümünü temizle butonu için.
document.querySelector("#clearButton").addEventListener("click", function () {
    removeAll();
})

function removeAll() { //localstoragedeki tüm ogeleri siler ve ul listesinin içini boşaltır
    localStorage.clear();
    ul.innerHTML = "";
}

//filtreleme işlemi burada yapıldı li elementlerini tek tek gezerek filtrelenen değeri içerip içermediğine bakıldı
document.querySelector("#input-list").addEventListener("keyup", filter);
function filter() {
    const filterValue = document.querySelector("#input-list").value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");

    todoList.forEach(function (item) {
        if (item.textContent.toLowerCase().trim().includes(filterValue)) {
            item.setAttribute("style", "display : block");
        }
        else {
            item.setAttribute("style", "display : none!important");
        }
    })


}