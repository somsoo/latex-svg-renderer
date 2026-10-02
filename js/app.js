// ==========================================================================
// 실시간 LaTeX & SVG 수식 렌더러 메인 애플리케이션
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const latexInput = document.getElementById('latexInput');
  const previewContent = document.getElementById('previewContent');
  const renderStatus = document.getElementById('renderStatus');
  const btnClearInput = document.getElementById('btnClearInput');

  const presetButtonsGrid = document.getElementById('presetButtonsGrid');
  const symbolsTray = document.getElementById('symbolsTray');
  const symTabButtons = document.querySelectorAll('.sym-tab-btn');
  const scaleButtons = document.querySelectorAll('.scale-btn');

  const btnCopySvg = document.getElementById('btnCopySvg');
  const btnDownloadSvg = document.getElementById('btnDownloadSvg');
  const btnDownloadPng = document.getElementById('btnDownloadPng');
  const btnCopyLatex = document.getElementById('btnCopyLatex');

  const historyList = document.getElementById('historyList');
  const btnClearHistory = document.getElementById('btnClearHistory');
  const toastMessage = document.getElementById('toastMessage');

  let currentScale = 1.4;
  let renderDebounceTimer = null;
  let lastValidSvgString = '';

  // ------------------------------------------------------------------------
  // 1. 초기화
  // ------------------------------------------------------------------------
  function init() {
    renderPresets();
    renderSymbolButtons('basic');
    renderHistory();
    setupEventListeners();

    // 초기 수식 렌더링
    triggerRender();
  }

  // ------------------------------------------------------------------------
  // 2. 프리셋 및 기호 툴바 렌더링
  // ------------------------------------------------------------------------
  function renderPresets() {
    presetButtonsGrid.innerHTML = '';
    LatexData.PRESETS.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-chip-btn';
      btn.textContent = p.name;
      btn.addEventListener('click', () => {
        latexInput.value = p.code;
        triggerRender();
        showToast(`[${p.name}] 공식이 로드되었습니다.`);
      });
      presetButtonsGrid.appendChild(btn);
    });
  }

  function renderSymbolButtons(category) {
    symbolsTray.innerHTML = '';
    const items = LatexData.SYMBOLS[category] || [];
    items.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sym-insert-btn';
      btn.textContent = item.label;
      btn.title = item.insert;
      btn.addEventListener('click', () => insertAtCursor(item.insert));
      symbolsTray.appendChild(btn);
    });
  }

  function insertAtCursor(text) {
    const start = latexInput.selectionStart;
    const end = latexInput.selectionEnd;
    const val = latexInput.value;
    latexInput.value = val.substring(0, start) + text + val.substring(end);
    latexInput.selectionStart = latexInput.selectionEnd = start + text.length;
    latexInput.focus();
    triggerRender();
  }

  // ------------------------------------------------------------------------
  // 3. 실시간 MathJax 렌더링 (디바운스 120ms)
  // ------------------------------------------------------------------------
  function triggerRender() {
    if (renderDebounceTimer) clearTimeout(renderDebounceTimer);
    renderDebounceTimer = setTimeout(performRender, 120);
  }

  function performRender() {
    const rawCode = latexInput.value.trim();
    if (!rawCode) {
      previewContent.innerHTML = '<span style="color:#94a3b8;font-size:0.9rem;">수식을 입력하면 여기에 실시간으로 렌더링됩니다.</span>';
      renderStatus.className = 'status-indicator ready';
      renderStatus.textContent = '입력 대기 중';
      lastValidSvgString = '';
      return;
    }

    if (!window.MathJax || typeof window.MathJax.tex2svg !== 'function') {
      previewContent.innerHTML = '<span style="color:#ef4444;">MathJax 엔진을 로딩 중입니다...</span>';
      return;
    }

    try {
      const node = window.MathJax.tex2svg(rawCode, { display: true });
      const errorNode = node.querySelector('.mjx-error');

      if (errorNode) {
        renderStatus.className = 'status-indicator error';
        renderStatus.textContent = '수식 문법 오류';
        previewContent.innerHTML = '';
        previewContent.appendChild(node);
      } else {
        renderStatus.className = 'status-indicator ready';
        renderStatus.textContent = '정상 렌더링';
        previewContent.innerHTML = '';
        previewContent.appendChild(node);

        // SVG 문자열 추출 및 가공
        const svgEl = node.querySelector('svg');
        if (svgEl) {
          prepareSvgAttributes(svgEl);
          lastValidSvgString = svgEl.outerHTML;
          // 저장소에 히스토리 기록
          LatexStorage.saveFormula(rawCode);
          renderHistory();
        }
      }
    } catch (err) {
      console.error('MathJax render error:', err);
      renderStatus.className = 'status-indicator error';
      renderStatus.textContent = '렌더링 실패';
    }
  }

  function prepareSvgAttributes(svg) {
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svg.style.color = '#000000';
    svg.style.fill = 'currentColor';
    svg.style.transform = `scale(${currentScale})`;
  }

  // ------------------------------------------------------------------------
  // 4. 내보내기 & 클립보드 복사 엔진
  // ------------------------------------------------------------------------
  function copySvgCode() {
    if (!lastValidSvgString) {
      showToast('복사할 수 있는 정상 렌더링 수식이 없습니다.');
      return;
    }
    navigator.clipboard.writeText(lastValidSvgString).then(() => {
      showToast('📋 SVG 벡터 코드가 클립보드에 복사되었습니다!');
    }).catch(() => {
      showToast('클립보드 접근이 제한되었습니다.');
    });
  }

  function downloadSvgFile() {
    if (!lastValidSvgString) {
      showToast('저장할 수 있는 정상 렌더링 수식이 없습니다.');
      return;
    }
    const blob = new Blob([lastValidSvgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formula_${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('💾 SVG 파일이 다운로드되었습니다!');
  }

  function downloadPngHighDpi() {
    if (!lastValidSvgString) {
      showToast('저장할 수 있는 정상 렌더링 수식이 없습니다.');
      return;
    }

    const svgBlob = new Blob([lastValidSvgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      // 300 DPI를 위한 3.5배 고해상도 스케일링
      const scaleFactor = 3.5;
      const width = (img.width || 300) * scaleFactor;
      const height = (img.height || 100) * scaleFactor;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // 투명 배경 위에 렌더링
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((pngBlob) => {
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `formula_300dpi_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
        showToast('🖼️ 300 DPI 투명 PNG가 다운로드되었습니다!');
      }, 'image/png');
    };

    img.src = url;
  }

  function copyLatexCode() {
    const code = latexInput.value.trim();
    if (!code) {
      showToast('복사할 LaTeX 코드가 없습니다.');
      return;
    }
    navigator.clipboard.writeText(code).then(() => {
      showToast('📑 LaTeX 코드가 복사되었습니다!');
    });
  }

  function showToast(msg) {
    toastMessage.textContent = msg;
    toastMessage.classList.add('show');
    setTimeout(() => {
      toastMessage.classList.remove('show');
    }, 2400);
  }

  // ------------------------------------------------------------------------
  // 5. 히스토리 렌더링
  // ------------------------------------------------------------------------
  function renderHistory() {
    const list = LatexStorage.getHistory();
    if (list.length === 0) {
      historyList.innerHTML = '<p class="empty-hint">작성된 수식이 여기에 자동 저장됩니다.</p>';
      return;
    }

    historyList.innerHTML = '';
    list.slice(0, 8).forEach(item => {
      const row = document.createElement('div');
      row.className = 'history-item';
      const timeStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      row.innerHTML = `<span class="history-code">${escapeHtml(item.code)}</span><span class="history-time">${timeStr}</span>`;
      row.addEventListener('click', () => {
        latexInput.value = item.code;
        triggerRender();
        showToast('저장된 수식을 불러왔습니다.');
      });
      historyList.appendChild(row);
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ------------------------------------------------------------------------
  // 6. 이벤트 바인딩
  // ------------------------------------------------------------------------
  function setupEventListeners() {
    latexInput.addEventListener('input', triggerRender);

    btnClearInput.addEventListener('click', () => {
      latexInput.value = '';
      latexInput.focus();
      triggerRender();
    });

    symTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        symTabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSymbolButtons(btn.dataset.tab);
      });
    });

    scaleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        scaleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentScale = parseFloat(btn.dataset.scale);
        const svg = previewContent.querySelector('svg');
        if (svg) {
          svg.style.transform = `scale(${currentScale})`;
        }
      });
    });

    btnCopySvg.addEventListener('click', copySvgCode);
    btnDownloadSvg.addEventListener('click', downloadSvgFile);
    btnDownloadPng.addEventListener('click', downloadPngHighDpi);
    btnCopyLatex.addEventListener('click', copyLatexCode);

    btnClearHistory.addEventListener('click', () => {
      if (confirm('모든 수식 작성 히스토리를 삭제하시겠습니까?')) {
        LatexStorage.clearHistory();
        renderHistory();
      }
    });
  }

  init();
});
