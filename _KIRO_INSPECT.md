# 사이트 정보: 실시간 LaTeX & SVG 수식 렌더러 (latex-svg-renderer)

- 주소: https://latex-svg-renderer.enjoy-onepage.com/
- 로컬 경로: `Webapp_Staging\latex-svg-renderer` (배포 완료 시 GitHub Pages main)
- 저장소: somsoo/latex-svg-renderer
- 배포 브랜치: main
- 상태: live (2026-10-02 배포 및 검증 완료)
- 허브 카드: 등록 대기
- 설명: LaTeX 수식을 실시간 렌더링하여 손실 없는 SVG 벡터 코드 및 300 DPI 투명 고화질 PNG로 내보내는 이공계·수험생 필수 수식 에디터.

## 기술 스택
- 수식 렌더링: MathJax 3 tex-svg 번들 (100% 로컬 내장, 무손실 SVG 글리프 패스 추출)
- 래스터라이징: Canvas 2D 기반 3.5배 고해상도 300 DPI 투명 배경 PNG 렌더링
- 기호 팔레트: 분수, 근호, 미적분, 극한, 행렬, 그리스 문자 원클릭 삽입
- 모바일 대응: 320px~1200px 0px 오버플로우, 제목/버튼 1줄 엄격 준수, AdSense 90px 클램프
- 데이터 저장: LocalStorage 기반 수식 히스토리 영속화
