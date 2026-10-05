---
title: "아날로그 변조(AM, FM, PM) 완벽 정리 및 전송 대역폭·효율 비교"
subject: "통신이론"
category: "아날로그 통신"
updatedAt: "2026-03-20"
tags: ["아날로그변조", "AM", "DSB-SC", "SSB", "VSB", "FM", "PM", "포위선검파", "카슨의법칙"]
summary: "변조의 기본 개념부터 진폭 변조(AM, DSB, SSB, VSB)와 각도 변조(FM, PM)의 수식 유도, 전력 효율, 전송 대역폭 및 복조 방식 총정리입니다."
---

## 1. 변조(Modulation)의 정의와 필요성

변조란 저주파 대역의 정보 신호(기저대역 메시지 신호, $m(t)$)를 원거리 전송에 적합한 고주파 반송파(Carrier, $c(t) = A_c \cos(2\pi f_c t + \theta)$)의 특정 파라미터(진폭, 주파수, 위상)에 실어 보내는 과정입니다.

공무원 시험에서 단골로 출제되는 변조의 필요성 4가지는 다음과 같습니다.

* 안테나 크기 최소화: 신호를 전파로 효율적으로 방사하려면 안테나 길이가 전송 신호 파장의 약 1/4 또는 1/2 수준($\lambda/4 \sim \lambda/2$)이어야 합니다. 주파수($f$)가 높아지면 파장($\lambda = c/f$)이 매우 짧아져 실용적인 크기의 소형 안테나를 제작할 수 있습니다.
* 다중화(Multiplexing) 구현: 여러 사용자의 음성이나 데이터를 각기 다른 반송 주파수로 변조하여 하나의 통신 채널(공기, 케이블)을 통해 간섭 없이 동시에 전송하는 주파수 분할 다중화(FDM)가 가능해집니다.
* 주파수 대역 할당 및 간섭 배제: 법적으로 정해진 전파 대역에 신호를 배치하여 다른 무선 통신 서비스와의 혼신을 방지합니다.
* 잡음 및 간섭에 대한 내성 개선: 주파수 변조(FM)나 펄스/디지털 변조 방식을 사용하여 통신 품질(S/N비)을 대폭 끌어올릴 수 있습니다.

---

## 2. 진폭 변조 (Amplitude Modulation, AM)

반송파의 진폭을 정보 신호 $m(t)$에 비례하여 변화시키는 선형 변조 방식입니다.

$$s(t) = [A_c + m(t)] \cos(2\pi f_c t)$$

정보 신호를 단일 정현파 $m(t) = A_m \cos(2\pi f_m t)$라고 할 때 변조도(Modulation Index, $\mu$ 또는 $m$)는 다음과 같이 정의됩니다.

$$\mu = \frac{A_m}{A_c} = \frac{V_{max} - V_{min}}{V_{max} + V_{min}}$$

* $\mu < 1$: 저변조 (정상 포락선 형성)
* $\mu = 1$: 100% 완전 변조
* $\mu > 1$: 과변조 (포락선 위상이 반전되어 왜곡 발생, 단순 다이오드 포위선 검파 불가)

---

### 진폭 변조 4대 방식 비교

| 변조 방식 | 전체 명칭 | 대역폭 ($B_T$) | 반송파 전송 여부 | 복조 방식 | 주요 특징 및 용도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DSB-LC (Standard AM)** | Double Sideband Large Carrier | $2f_m$ | 반송파 전송 (대형 반송파) | 포위선 검파<br>(Envelope, 비동기) | 수신기 구조가 매우 단순하고 저렴,<br>전력 효율 낮음 (중파 AM 라디오) |
| **DSB-SC** | Double Sideband Suppressed Carrier | $2f_m$ | 반송파 억압 | 동기 검파<br>(Coherent) | 반송파를 보내지 않아 전력 효율 개선,<br>수신기에 국부 발진기 동기 필요 |
| **SSB** | Single Sideband | $f_m$ | 반송파 및 한쪽 측파대 억압 | 동기 검파<br>(Coherent) | 주파수 및 전력 효율 극대화,<br>필터 설계 까다로움 (단파 통신, 군용) |
| **VSB** | Vestigial Sideband (잔류 측파대) | $f_m < B_T < 2f_m$<br>($f_m + f_v$) | 반송파 및 한쪽 측파대 대부분 억압 | 포위선 또는 동기 검파 | SSB 필터 제작의 한계 극복,<br>초저주파 성분 보존 (아날로그 TV 영상) |

---

### AM의 전력 계산과 전송 효율

표준 AM(DSB-LC) 신호의 총 송신 전력($P_t$)은 무변조 반송파 전력($P_c$)과 상·하 측파대 전력($P_{USB}, P_{LSB}$)의 합입니다.

$$P_t = P_c + P_{USB} + P_{LSB} = P_c \left(1 + \frac{\mu^2}{4} + \frac{\mu^2}{4}\right) = P_c \left(1 + \frac{\mu^2}{2}\right)$$

실제 음성 정보는 측파대($P_{SB} = P_c \cdot \frac{\mu^2}{2}$)에만 들어 있으므로, 송신 전력 중 정보 전송에 기여하는 효율($\eta$)은 다음과 같습니다.

$$\eta = \frac{P_{SB}}{P_t} = \frac{\frac{\mu^2}{2}}{1 + \frac{\mu^2}{2}} = \frac{\mu^2}{2 + \mu^2}$$

* 100% 변조 시 ($\mu = 1$): 전송 효율 $\eta = \frac{1}{3} \approx 33.3\%$ (전력의 66.7%는 쓸모없는 반송파에 낭비됨)
* 과변조를 피하기 위해 통상 $\mu \approx 0.7$ 수준으로 송신하므로 실효 전력 효율은 약 20% 내외에 불과함

---

## 3. 각도 변조 (Angle Modulation: FM & PM)

반송파의 진폭은 일정하게 유지하고 위상각 $\theta(t)$에 정보 신호를 실어 보내는 비선형 변조 방식입니다.

$$s(t) = A_c \cos[\theta(t)] = A_c \cos[2\pi f_c t + \phi(t)]$$

순시 주파수 $f_i(t)$는 위상의 시간 변화율입니다.
$$f_i(t) = \frac{1}{2\pi} \frac{d\theta(t)}{dt} = f_c + \frac{1}{2\pi} \frac{d\phi(t)}{dt}$$

---

### 주파수 변조(FM) vs 위상 변조(PM)

| 구분 | 주파수 변조 (FM) | 위상 변조 (PM) |
| :--- | :--- | :--- |
| **순시 위상 편이** $\phi(t)$ | $2\pi k_f \int_{-\infty}^{t} m(\tau) d\tau$ | $k_p m(t)$ |
| **순시 주파수** $f_i(t)$ | $f_c + k_f m(t)$ | $f_c + \frac{k_p}{2\pi} \frac{dm(t)}{dt}$ |
| **최대 주파수 편이** $\Delta f$ | $k_f A_m$ (신호 주파수 $f_m$에 무관) | $\frac{k_p A_m f_m}{2\pi} \propto f_m$ (신호 주파수 $f_m$에 비례) |
| **변조 지수** $\beta$ | $\beta = \frac{\Delta f}{f_m} = \frac{k_f A_m}{f_m}$ | $\beta = k_p A_m$ |
| **상호 변환 관계** | 정보 신호 $m(t)$를 적분한 후 PM 변조기에 인가 | 정보 신호 $m(t)$를 미분한 후 FM 변조기에 인가 |

---

### 카슨의 법칙 (Carson's Rule)과 FM 대역폭

FM 신호의 스펙트럼은 제1종 베셀 함수($J_n(\beta)$)로 전개되어 이론상 무한대의 대역폭을 요구하지만, 전체 전력의 약 98%가 집중되는 실효 전송 대역폭은 카슨의 법칙으로 계산합니다.

$$B_T \approx 2(\Delta f + f_m) = 2f_m(\beta + 1)$$

* 협대역 FM (NBFM, $\beta \ll 1$): $B_T \approx 2f_m$ (AM과 대역폭 동일)
* 광대역 FM (WBFM, $\beta \gg 1$): $B_T \approx 2\Delta f$ (주파수 편이에 의해 전적으로 결정)

---

## 4. 아날로그 통신 잡음 및 특수 기술

### 1) 프리엠파시스(Pre-emphasis)와 디엠파시스(De-emphasis)
FM 수신기의 주파수 판별기(Discriminator) 특성상 고주파 영역으로 갈수록 복조 잡음 전력 밀도가 주파수의 제곱($f^2$)에 비례하여 급격히 증가(삼각형 잡음 스펙트럼, Triangular Noise)합니다.
* 프리엠파시스: 송신단에서 고주파 음성 신호를 미리 강조하여 증폭 (미분기/고역 통과 필터, HPF 사용)
* 디엠파시스: 수신단에서 강조된 고주파 신호를 원래대로 감쇄시키면서 함께 유입된 고주파 잡음을 대폭 억압 (적분기/저역 통과 필터, LPF 사용)
* 효과: 수신단의 최종 신호 대 잡음비(SNR) 대폭 향상

### 2) 문턱 효과 (Threshold Effect)
각도 변조(FM, PM) 및 비동기 AM 포위선 검파기에서 수신 입력의 반송파 대 잡음비(CNR)가 특정 임계점(보통 10 dB 안팎) 이하로 떨어지면, 출력 SNR이 급격하게 붕괴되어 급격한 잡음(Click Noise)이 발생하는 현상입니다. 동기 검파를 사용하는 선형 변조(DSB-SC, SSB)에서는 문턱 효과가 발생하지 않습니다.

---

## 5. 시험에 자주 나오는 계산 팁 및 핵심 함정

### 팁 1: AM 신호의 포락선 검파 조건 (RC 시정수)
다이오드 포위선 검파기에서 충방전 시정수 $RC$는 다음 조건을 만족해야 합니다.
$$\frac{1}{f_c} \ll RC \ll \frac{1}{f_m}$$
* $RC$가 너무 작으면: 반송파 리플이 제대로 걸러지지 않음
* $RC$가 너무 크면: 방전이 너무 느려 급격히 떨어지는 음성 신호의 포락선을 따라가지 못해 대각선 왜곡(Diagonal Clipping) 발생

### 팁 2: SSB 신호의 힐베르트 변환 (Hilbert Transform)
메시지 신호 $m(t)$의 각 주파수 성분을 $-90^\circ$ 위상 천이시킨 신호를 $\hat{m}(t)$라고 할 때:
* 상측파대(USSB): $s_{USSB}(t) = A_c m(t) \cos(2\pi f_c t) - A_c \hat{m}(t) \sin(2\pi f_c t)$ (가운데 부호 마이너스)
* 하측파대(LSSB): $s_{LSSB}(t) = A_c m(t) \cos(2\pi f_c t) + A_c \hat{m}(t) \sin(2\pi f_c t)$ (가운데 부호 플러스)

### 팁 3: AM 전력 증가율 암산
100% 변조($\mu = 1$)일 때 총 전력은 무변조 시에 비해 정확히 1.5배(50% 증가)가 됩니다.

---

## 6. 관련 기출문제 풀어보기

실제 공무원 9급 국가직 및 지방직(통신이론, 무선공학개론, 전자공학개론)에 출제된 아날로그 변조 관련 기출문제 모음입니다. 각 링크를 클릭하면 해당 문제 풀이 및 상세 해설로 즉시 이동합니다.

### 📌 지방직 9급 통신이론
- [2025년 지방직 9급 통신이론 6번 풀이 바로가기](/exams/communication/local/2025#q-6)
- [2023년 지방직 9급 통신이론 11번 풀이 바로가기](/exams/communication/local/2023#q-11)
- [2022년 지방직 9급 통신이론 7번 풀이 바로가기](/exams/communication/local/2022#q-7)
- [2021년 지방직 9급 통신이론 8번 풀이 바로가기](/exams/communication/local/2021#q-8)
- [2021년 지방직 9급 통신이론 7번 풀이 바로가기](/exams/communication/local/2021#q-7)
- [2020년 지방직 9급 통신이론 5번 풀이 바로가기](/exams/communication/local/2020#q-5)
- [2019년 지방직 9급 통신이론 7번 풀이 바로가기](/exams/communication/local/2019#q-7)
- [2016년 지방직 9급 통신이론 12번 풀이 바로가기](/exams/communication/local/2016#q-12)
- [2009년 지방직 9급 통신이론 15번 풀이 바로가기](/exams/communication/local/2009#q-15)
- [2009년 지방직 9급 통신이론 1번 풀이 바로가기](/exams/communication/local/2009#q-1)

### 📌 국가직 9급 무선공학개론
- [2026년 국가직 9급 무선공학개론 13번 풀이 바로가기](/exams/wireless/national/2026#q-13)
- [2026년 국가직 9급 무선공학개론 12번 풀이 바로가기](/exams/wireless/national/2026#q-12)
- [2026년 국가직 9급 무선공학개론 2번 풀이 바로가기](/exams/wireless/national/2026#q-2)
- [2025년 국가직 9급 무선공학개론 4번 풀이 바로가기](/exams/wireless/national/2025#q-4)
- [2024년 국가직 9급 무선공학개론 7번 풀이 바로가기](/exams/wireless/national/2024#q-7)
- [2018년 국가직 9급 무선공학개론 3번 풀이 바로가기](/exams/wireless/national/2018#q-3)
- [2014년 국가직 9급 무선공학개론 7번 풀이 바로가기](/exams/wireless/national/2014#q-7)
- [2012년 국가직 9급 무선공학개론 7번 풀이 바로가기](/exams/wireless/national/2012#q-7)
- [2009년 국가직 9급 무선공학개론 6번 풀이 바로가기](/exams/wireless/national/2009#q-6)
- [2008년 국가직 9급 무선공학개론 14번 풀이 바로가기](/exams/wireless/national/2008#q-14)

### 📌 국가직 & 지방직 전자공학개론
- [2016년 국가직 9급 전자공학개론 18번 풀이 바로가기](/exams/electronics/national/2016#q-18)
- [2015년 국가직 9급 전자공학개론 4번 풀이 바로가기](/exams/electronics/national/2015#q-4)
- [2015년 국가직 9급 전자공학개론 3번 풀이 바로가기](/exams/electronics/national/2015#q-3)
- [2014년 국가직 9급 전자공학개론 7번 풀이 바로가기](/exams/electronics/national/2014#q-7)
- [2009년 국가직 9급 전자공학개론 4번 풀이 바로가기](/exams/electronics/national/2009#q-4)
- [2012년 지방직 9급 전자공학개론 6번 풀이 바로가기](/exams/electronics/local/2012#q-6)