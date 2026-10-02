// ==========================================================================
// 수식 작성 히스토리 로컬 스토리지 관리자
// ==========================================================================
const LatexStorage = (function () {
  const STORAGE_KEY = 'latex_svg_history_v1';

  function getHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveFormula(code) {
    if (!code || !code.trim()) return;
    try {
      let list = getHistory();
      // 기존 동일 코드 제거 후 최신화
      list = list.filter(item => item.code !== code);
      list.unshift({
        code,
        timestamp: Date.now()
      });
      // 최대 20개 유지
      if (list.length > 20) list.pop();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function clearHistory() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  return {
    getHistory,
    saveFormula,
    clearHistory
  };
})();
