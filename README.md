# jQuery 플로그인 아코디언 메뉴
> 개인적으로 사용하려고 만든 플로그인입니다.


## 설치방법
- [다운로드.zip](https://github.com/buppagi/accordion-menu/archive/master.zip) 및 [min 파일](https://raw.githubusercontent.com/buppagi/accordion-menu/master/minified/accordion.min.js)를 다운로드 받습니다.
- `<head></head>`사이 또는 `<body>` 영역에 `<script src="accordion.min.js"></script>` 삽입하시면 됩니다.

## 사용하기
- 1번째 탭 말고도 활성화 가능함.
- 클래스 변경가능

### 기본 탭
#### `<dl>`요소 사용 예
```html
<dl class="accordion-exam-dl" id="accExamDL">
  <dt class="accordion-heading">
    <a class="accordion-trigger" href="#testPanel" id="testId" aria-controls="testPanel"><span class="accordion-title">아코디언 메뉴1</span></a>
  </dt>
  <dd class="accordion-panel" id="testPanel">아코디언 Panel 1</dd>
  <dt class="accordion-heading">
    <a class="accordion-trigger" href="#" id="testId2" aria-controls="testPanel2"><span class="accordion-title">아코디언 메뉴2</span></a>
  </dt>
  <dd class="accordion-panel" id="testPanel2">아코디언 Panel 2</dd>
</dl>
```

#### JavaScript
```js
$(document).ready(function(){
  $('#accExamDL').accordionUi();
});
```

### `<ul>`요소 사용 예
```html
<ul class="accordion-exam-ul" id="accExamUL">
  <li>
    <div class="accordion-heading">
      <a class="accordion-trigger" href="#" id="testUlBtn" aria-controls="testUlPanel1"><span class="accordion-title">아코디언 메뉴1</span></a>
    </div>
    <div class="accordion-panel" id="testUlPanel1">아코디언 UL Panel 1</div>
  </li>
  <li>
    <div class="accordion-heading">
      <a class="accordion-trigger" href="#" id="testUlBtn2" aria-controls="testUlPanel2"><span class="accordion-title">아코디언 메뉴2</span></a>
    </div>
    <div class="accordion-panel" id="testUlPanel2">아코디언 UL Panel 2</div>
  </li>
</ul>
```

### 펼쳐진 상태 기본값
```html
<ul class="accordion-exam-ul open" id="accExamULOpen">
  <li>
    <div class="accordion-heading">
      <a class="accordion-trigger is-current" href="#" id="testUlBtnOpen" aria-controls="testUlOpenPanel1"><span class="accordion-title">아코디언 메뉴1</span></a>
    </div>
    <div class="accordion-panel" id="testUlOpenPanel1">아코디언 UL Panel Open 1</div>
  </li>
  <li>
    <div class="accordion-heading">
      <a class="accordion-trigger is-current" href="#" id="testUlBtnOpen2" aria-controls="testUlOpenPanel2"><span class="accordion-title">아코디언 메뉴2</span></a>
    </div>
    <div class="accordion-panel" id="testUlOpenPanel2">아코디언 UL Panel Open 2</div>
  </li>
  <li>
    <div class="accordion-heading">
      <a class="accordion-trigger is-current" href="#" id="testUlBtnOpen3" aria-controls="testUlOpenPanel3"><span class="accordion-title">아코디언 메뉴3</span></a>
    </div>
    <div class="accordion-panel" id="testUlOpenPanel3">아코디언 UL Panel Open 3</div>
  </li>
</ul>
```
`accordion-trigger`에는 `is-current`를 넣어야 하며,`accordion-panel`에는 `display:block`되어야 합니다.

## 옵션 값
+ `triggerClass` - accordion-trigger
+ `panelClass` - accordion-panel
+ `headingClass` - accordion-heading
+ `activeClass` - 활성화 클래스 (기본 값: is-current)
+ `viewMoving` - 화면 이동 (기본 값: false)

### 옵션 변경
```js
// 화면 이동
$(document).ready(function(){
  $('#accExam').accordionUi({
    viewMoving: true
  });
});
```


## 현재버전 단점
- 다중 셀럭터가 안됩니다. 보완할 필요성 보임.
- 키보드 접근에 대한 보완 필요성 보임.


## 마치며
<p>혼자 연습하면서 사용하려고 만들어 봤던 플로그인을 공개합니다. 아직 미완성이라 안되는 것이 은근 많습니다. ㅠㅠ</p>

피드백은 [이슈](https://github.com/buppagi/accordion-menu/issues)에 해주시면 감사하겠습니다.
