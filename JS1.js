//用列表的方式呈現對話或劇情
const story = [
	"阿剛:早上好!!(｀∇´ゞ",
	"阿剛:最令人敬愛的社會我魚姊(シ_ _)シ ",
	"阿剛:祝福您誕辰快樂",
];

//找到HTML中id為text的物件並將其命名為story_text
const story_text = document.getElementById("text")

const nextButton = document.querySelector(".fill-btn");

//設now_story_text為當前對話再story的編號
let now_story_text = 0

//設now_text為當前打到該對話的第幾個字
let now_text = 0


//設typing_speed為打字速度(毫秒)
const typing_speed = 200

//設typing為是否正在打字
let typing = false;

//設fulltext為當前的對話
function type(){

	typing = true;

	//設fulltext為當前的對話
	const fulltext=story[now_story_text]

	//如果當前打的字數還小於該對話的總字數，則在story_text加入fulltext中對應的文字，並在打完該字後使now_text + 1
	if (now_text < fulltext.length){
		story_text.textContent +=fulltext.charAt(now_text);

		now_text++;

		//使用setTimeout(函數，時間(毫秒))函數重複執行typ()函數
		setTimeout(type,typing_speed);
	}

	else{
		typing=false;

		open_point();
	}
}

//找到HTML中id為point的物件並將其命名為point_text
const point_text = document.getElementById("point")

function open_point(){
	//=如果point_text存在，則設point_text的透明度 = 1 ，並生成一個只觀察一次點擊事件就消失的觀察者，並在觀察後呼叫next()函數
	if (point_text){
		point_text.style.opacity = 1;

		document.addEventListener("click",next,{once:true});
		//在point_text加入一個名為flash的屬性，插入setInterval(函數,時間(毫秒))，偵測point_text的透明度是否為1，如果是則換成0，否則換成1
		point_text.flash = setInterval(()=>{
			point_text.style.opacity=point_text.style.opacity == 1 ? 0 : 1;},800)

	}
}

//**setTimeout()與setInterval()的差別是前者指呼喚一次，後者則呼喚無限次

function close_point(){

	//如果point_text存在則設point_text的透明度 = 0 ，
	if(point_text){
		point_text.style.opacity = 0;

		//使用clearInterval(變數.屬性)函數來關閉setInterval()函數
		clearInterval(point_text.flash);

		//將point_text的flash屬性刪除，如果要做邏輯判定這才有用，算是提醒遺下自己而已，在這份網頁中沒任何意義
		point_text.flash = null;

	}
}

function next(){

	now_story_text++;
	//如果當前打完的對話編號還小於總對話的總數 - 1 ，則清除story_text的內容，並設now_text = 0 ，最後在呼叫close_point()與type()函數
	if (now_story_text < story.length){
		story_text.textContent = "";
		now_text = 0
		close_point();
		type();
	}
	//如果打完最後的對話，則呼叫close_point()函數
	else{
        close_point()
        if (nextButton) {
            nextButton.style.visibility = "visible"; // 改用 visibility 顯示按鈕，不改變排版高度
        }
	}
}
//網頁開啟時便開始打字
type();
if (nextButton) {
    nextButton.addEventListener("click", function() {
        window.location.href = "HTML2.html"; // 確保這裡的檔名與你的目標檔案一致
    });
}