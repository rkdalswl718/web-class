const totalDisplay = document.getElementById("total");
const todayDisplay = document.getElementById("today");
let today = localStorage.getItem('today') || 1;
let total = localStorage.getItem('total') || 6432;
const currentDate = new Date();
let lastResetDate = localStorage.getItem('lastResetDate');
const chatBox = document.querySelector(".chat");
const inputForm = document.getElementById('comment-form');
const cancelButton = document.querySelector('.form-cancel');
const commentList = document.getElementById('comment-list');
// 초기 데이터 
const initialComments = [
  {
    name: "첫 번째 방문자",
    timestamp: "2024-06-18 10:00 AM",
    comment: "안녕하세요! 방명록에 오신 것을 환영합니다."
  },
  {
    name: "두 번째 방문자",
    timestamp: "2024-06-18 11:30 AM",
    comment: "방명록에 남기는 메시지입니다. 잘 부탁드립니다!"
  },
  {
    name: "세 번째 방문자",
    timestamp: "2024-06-18 2:15 PM",
    comment: "더미 데이터를 이용한 초기 방명록 테스트입니다."
  }
];

// 함수: 오늘 날짜 리셋
const resetToday = () => {
  today = 1;
  todayDisplay.innerText = today;
  localStorage.setItem('today', today);
  lastResetDate = currentDate.getDate(); // lastResetDate를 오늘 날짜로 업데이트
  localStorage.setItem('lastResetDate', lastResetDate);
};

// 함수: 오늘 날짜 증가
const increaseToday = () => {
  today++;
  todayDisplay.innerText = today;
  localStorage.setItem('today', today);
};

// 함수: 전체 방문자 수 증가
const increaseTotal = () => {
  total++;
  totalDisplay.innerText = total;
  localStorage.setItem('total', total);
};

// 이벤트: 페이지 로드 시 초기화 및 오디오 재생
window.addEventListener('DOMContentLoaded', () => {
  if (!lastResetDate || parseInt(lastResetDate) !== currentDate.getDate()) {
    resetToday();
  } else {
    increaseToday();
  }
  increaseTotal();

  const audio = document.getElementById('audio');
  audio.play();

  // 초기 방명록 로드
  const savedComments = JSON.parse(localStorage.getItem('guestbookComments')) || initialComments;
  renderComments(savedComments);
});

// 이벤트: 방명록 제출
commentForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const { name, comment } = e.target.elements;
  const timestamp = new Date().toLocaleString();
  const newComment = {
    name: name.value,
    timestamp: timestamp,
    comment: comment.value
  };
  addComment(newComment);
  e.target.reset();

  inputForm.style.display = 'none';
  increaseToday(); // 방문자 수 증가
});

// 이벤트: 방명록 입력 창 열기
chatBox.addEventListener('click', () => {
  inputForm.style.display = 'block';
});

// 이벤트: 취소 버튼 클릭 시 입력 창 닫기
cancelButton.addEventListener('click', () => {
  inputForm.style.display = 'none';
});

// 이벤트: 엔터 키 입력 시 방명록 제출 이벤트 발생
commentForm.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    commentForm.dispatchEvent(new Event('submit'));
  }
});

// 함수: 방명록 추가 및 저장
function addComment(comment) {
  const savedComments = JSON.parse(localStorage.getItem('guestbookComments')) || [];
  savedComments.unshift(comment);
  localStorage.setItem('guestbookComments', JSON.stringify(savedComments));
  renderComments(savedComments);
}

// 함수: 방명록 출력
function renderComments(comments) {
  commentList.innerHTML = comments.map(comment => {
    return `<div class="comment">
      <p><span class="name">${comment.name}</span><span class="timestamp">${comment.timestamp}</span></p>
      <p>${comment.comment}</p>
    </div>`;
  }).join('');
}
