---
title: "디지털 변조(ASK, FSK, PSK, QAM, PCM) 완벽 정리 및 대역폭·오율 특성"
subject: "통신이론"
category: "디지털 통신"
updatedAt: "2026-03-20"
tags: ["디지털변조", "PCM", "ASK", "FSK", "PSK", "QAM", "대역폭효율", "성상도", "BER"]
summary: "기저대역 펄스 변조(PCM)부터 대역통과 디지털 변조(ASK, FSK, PSK, QAM)의 원리, 성상도, 전력 대역폭 효율 및 오류 확률(BER) 특성 총정리입니다."
---

## 1. 디지털 변조(Digital Modulation)의 기본 개념

디지털 변조는 0과 1로 이루어진 디지털 이진 데이터(비트 열)를 통신 채널에 적합한 파형으로 변환하는 기술입니다. 전송 형태에 따라 크게 두 가지로 분류됩니다.

* 기저대역(Baseband) 전송: 아날로그 음성이나 신호를 디지털 코드로 바꾼 뒤(PCM) 반송파 없이 펄스 전압 형태 그대로 전송하는 방식 (유선 LAN, 광통신 등).
* 대역통과(Passband) 전송: 고주파 정현파 반송파($c(t) = A_c \cos(2\pi f_c t + \theta)$)의 진폭, 주파수, 위상에 디지털 비트를 매핑하여 무선 공간으로 방사하는 방식.

---

## 2. 펄스 코드 변조 (Pulse Code Modulation, PCM)

아날로그 신호를 디지털 비트 열로 변환하는 가장 대표적인 기저대역 변조 방식입니다. 3단계 핵심 절차(표본화 $\rightarrow$ 양자화 $\rightarrow$ 부호화)로 구성됩니다.

### 1) 표본화 (Sampling)
연속 시간 아날로그 신호에서 주기적인 간격($T_s$)마다 순시 전압 값을 추출하는 과정입니다.
* 나이퀴스트 표본화 정리(Nyquist Sampling Theorem): 신호의 최고 주파수를 $f_{max}$라 할 때 왜곡(앨리어싱, Aliasing) 없이 원래 신호를 복원하기 위한 최소 표본화 주파수는 다음과 같습니다.
  $$f_s \ge 2 f_{max}$$
* 표본화 주기: $T_s = \frac{1}{f_s} \le \frac{1}{2f_{max}}$

### 2) 양자화 (Quantization)
표본화된 연속 진폭 값을 유한한 개수의 불연속적인 대표 전압 준위(Level, $M = 2^n$)로 근사화하는 과정입니다.
* 비트 수($n$)와 양자화 레벨 수($M$): $M = 2^n$ (예: $n = 8\text{ bit}$이면 $M = 256\text{ levels}$)
* 양자화 잡음(Quantization Noise): 원래 신호 전압과 양자화된 대표 값 사이의 오차로, 비가역적(되돌릴 수 없는) 잡음입니다.
* 신호 대 양자화 잡음비 (SQNR, 균일 양자화 정현파 기준 공식):
  $$\text{SQNR (dB)} \approx 6.02n + 1.76 \text{ [dB]} \approx 6n \text{ [dB]}$$
  (비트 수 $n$이 1비트 증가할 때마다 SQNR은 약 6 dB씩 개선됩니다.)
* 비균일 양자화: 진폭이 작은 구간은 양자화 스텝을 잘게 쪼개고, 진폭이 큰 구간은 널리 쪼개어 저신호 영역의 SNR을 개선하는 압신(Companding) 기법입니다. ($\mu$-law: 한국·북미 8비트 PCM, A-law: 유럽 8비트 PCM)

### 3) 부호화 (Encoding) 및 전송률
양자화된 대표 레벨을 $n$자리의 이진수(0과 1) 부호로 변환합니다.
* 전송 비트율(Bit Rate, $R_b$):
  $$R_b = f_s \times n \text{ [bps]}$$
  (예: 음성 대역 $f_{max} = 4\text{ kHz}$를 표본화율 $f_s = 8\text{ kHz}$, $n = 8\text{ bit}$로 양자화하면 $R_b = 8,000 \times 8 = 64\text{ kbps}$ 표준 PCM 채널이 형성됩니다.)

---

## 3. 대역통과 디지털 변조 4대 방식

디지털 데이터 비트를 반송파의 세 가지 기본 파라미터에 매핑하는 방식입니다.

### 1) 진폭 편이 변조 (Amplitude Shift Keying, ASK)
* 반송파의 진폭을 비트에 따라 변화시키는 방식입니다.
* OOK (On-Off Keying): 2진 ASK(BASK)의 가장 단순한 형태로, 비트 1일 때는 반송파 송출($A_c \cos(2\pi f_c t)$), 비트 0일 때는 송출 중단($0$).
* 특징: 회로 구성이 매우 단순하지만 진폭 잡음 및 채널 페이딩에 극도로 취약하여 무선 환경에서는 단독으로 거의 사용되지 않습니다.

### 2) 주파수 편이 변조 (Frequency Shift Keying, FSK)
* 반송파의 진폭은 일정하게 유지하고 비트에 따라 서로 다른 두 개 이상의 주파수를 할당하는 방식입니다.
* 비트 1: 마크(Mark) 주파수 $f_1$, 비트 0: 스페이스(Space) 주파수 $f_2$
* 직교성(Orthogonality) 조건: 동기 검파 시 두 주파수 간격 $\Delta f = |f_1 - f_2| \ge \frac{1}{2T_b}$, 비동기 검파 시 $\Delta f \ge \frac{1}{T_b}$
* 특징: 진폭 변동에 강하고 포락선이 일정(Constant Envelope)하여 비선형 증폭기를 쓸 수 있으나 점유 대역폭이 넓습니다.

### 3) 위상 편이 변조 (Phase Shift Keying, PSK)
* 반송파의 진폭과 주파수는 일정하게 두고 비트에 따라 반송파의 위상을 불연속적으로 전환하는 방식입니다.
* BPSK (Binary PSK): 비트 0과 1에 위상차 $180^\circ$($\pi$)를 부여 ($0^\circ, 180^\circ$).
* QPSK (Quadrature PSK): 2비트를 1개의 심볼(Symbol)로 묶어 4가지 위상($0^\circ, 90^\circ, 180^\circ, 270^\circ$ 또는 $45^\circ, 135^\circ, 225^\circ, 315^\circ$)으로 전송.
* 대역폭 효율: 동일 대역폭에서 BPSK보다 전송 속도가 2배 빠릅니다.

### 4) 직교 진폭 변조 (Quadrature Amplitude Modulation, QAM)
* 위상뿐만 아니라 진폭까지 동시에 변조하여 신호점 간의 거리를 최적화한 방식입니다.
* 서로 직교하는 두 반송파($\cos, \sin$)를 이용해 진폭 변조된 두 신호를 합산합니다.
* 16-QAM은 심볼당 4비트($2^4 = 16$), 64-QAM은 심볼당 6비트($2^6 = 64$), 256-QAM은 심볼당 8비트를 전송합니다.
* 특징: 대역폭 효율($\text{bps/Hz}$)이 압도적으로 우수하여 디지털 케이블 방송, Wi-Fi, 4G LTE, 5G의 표준 고속 변조 기술로 사용됩니다.

---

## 4. 대역폭, 전력 효율 및 비트 오율(BER) 특성 비교

공무원 시험에서 가장 많이 출제되는 비교 정리 표입니다.

| 변조 방식 | 심볼당 비트 수 ($k$) | 최소 널 대역폭 ($B$) | 대역폭 효율 ($\eta_B = R_b/B$) | 전력 효율 (오율 특성) | 비동기 검파 가능 여부 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BASK (OOK)** | 1 bit | $2 R_b$ (또는 $R_b$) | 낮음 ($1\text{ bps/Hz}$) | 나쁨 | 가능 (포위선 검파) |
| **BFSK** | 1 bit | $2\Delta f + 2R_b$ | 매우 낮음 ($< 1\text{ bps/Hz}$) | 중간 | 가능 (비동기 판별기) |
| **BPSK** | 1 bit | $2 R_b$ (또는 $R_b$) | 낮음 ($1\text{ bps/Hz}$) | 매우 우수 (동일 SNR 최저 BER) | 불가 (동기 검파 필수) |
| **DPSK (차동)** | 1 bit | $2 R_b$ | 낮음 | BPSK보다 약 3 dB 열화 | 가능 (차동 지연 검파) |
| **QPSK** | 2 bits | $R_b$ ($2 R_s$) | 중간 ($2\text{ bps/Hz}$) | 우수 (BPSK와 동일한 BER 곡선) | 불가 (동기 검파 필수) |
| **$M$-ary PSK** | $k = \log_2 M$ | $\frac{2 R_b}{\log_2 M}$ | $M$ 증가 시 대역폭 효율 증가 | $M$ 증가 시 오율 특성 급격히 악화 | 불가 |
| **$M$-ary FSK** | $k = \log_2 M$ | $\frac{M R_b}{\log_2 M}$ | $M$ 증가 시 대역폭 효율 감소 | $M$ 증가 시 전력 효율 개선 (BER 향상) | 가능 |
| **$M$-ary QAM** | $k = \log_2 M$ | $\frac{2 R_b}{\log_2 M}$ | 매우 우수 ($M$ 커질수록 극대화) | $M$-PSK보다 성상도 거리가 멀어 오율 양호 | 불가 (동기 검파 필수) |

---

## 5. 시험에 자주 나오는 계산 공식 및 빈출 함정

### 팁 1: 심볼율(Symbol Rate, 보오율 Baud)과 비트율(Bit Rate) 변환
* $M$진 변조에서 심볼당 비트 수 $k = \log_2 M$
* 심볼율(Baud, $R_s$)과 비트율($R_b$) 관계:
  $$R_b = R_s \times \log_2 M \iff R_s = \frac{R_b}{\log_2 M}$$
* 예: 16-QAM에서 심볼 레이트가 10 Mbaud이면 데이터 비트율은 $10 \times 4 = 40\text{ Mbps}$입니다.

### 팁 2: $M$ 증가에 따른 대역폭 효율 트레이드오프 (단골 출제)
* $M$-PSK, $M$-QAM: $M$이 커질수록 좁은 대역폭에 많은 비트를 밀어 넣으므로 대역폭 효율($\text{bps/Hz}$)은 증가하지만, 성상도 신호점 사이의 거리가 좁아져 잡음에 취약해집니다(더 높은 $E_b/N_0$ 필요).
* $M$-FSK: $M$이 커질수록 서로 직교하는 주파수를 추가해야 하므로 대역폭이 기하급수적으로 늘어나지만, 직교 공간이 확장되어 전력 효율(오류율 특성)은 오히려 좋아집니다.

### 팁 3: BPSK vs QPSK 오류 확률 동등성
QPSK는 직교하는 두 개의 독립적인 BPSK 시스템(I-채널, Q-채널)을 합친 것과 수학적으로 동일하므로, 동일한 비트당 에너지 대비 잡음비($E_b/N_0$)에서 비트 오율(BER) 곡선이 BPSK와 완전히 일치합니다.

---

## 6. 관련 기출문제 풀어보기

실제 공무원 9급 국가직 및 지방직(통신이론, 무선공학개론, 전자공학개론)에 출제된 디지털 변조 관련 기출문제 모음입니다. 각 링크를 클릭하면 해당 문제 풀이 및 상세 해설로 즉시 이동합니다.

### 📌 지방직 9급 통신이론
- [2026년 지방직 9급 통신이론 10번 풀이 바로가기](/exams/communication/local/2026#q-10)
- [2024년 지방직 9급 통신이론 19번 풀이 바로가기](/exams/communication/local/2024#q-19)
- [2024년 지방직 9급 통신이론 15번 풀이 바로가기](/exams/communication/local/2024#q-15)
- [2022년 지방직 9급 통신이론 20번 풀이 바로가기](/exams/communication/local/2022#q-20)
- [2022년 지방직 9급 통신이론 17번 풀이 바로가기](/exams/communication/local/2022#q-17)
- [2022년 지방직 9급 통신이론 11번 풀이 바로가기](/exams/communication/local/2022#q-11)
- [2021년 지방직 9급 통신이론 20번 풀이 바로가기](/exams/communication/local/2021#q-20)
- [2021년 지방직 9급 통신이론 6번 풀이 바로가기](/exams/communication/local/2021#q-6)
- [2020년 지방직 9급 통신이론 14번 풀이 바로가기](/exams/communication/local/2020#q-14)
- [2018년 지방직 9급 통신이론 19번 풀이 바로가기](/exams/communication/local/2018#q-19)
- [2018년 지방직 9급 통신이론 9번 풀이 바로가기](/exams/communication/local/2018#q-9)
- [2016년 지방직 9급 통신이론 15번 풀이 바로가기](/exams/communication/local/2016#q-15)
- [2016년 지방직 9급 통신이론 13번 풀이 바로가기](/exams/communication/local/2016#q-13)
- [2015년 지방직 9급 통신이론 11번 풀이 바로가기](/exams/communication/local/2015#q-11)
- [2015년 지방직 9급 통신이론 3번 풀이 바로가기](/exams/communication/local/2015#q-3)
- [2014년 지방직 9급 통신이론 17번 풀이 바로가기](/exams/communication/local/2014#q-17)
- [2014년 지방직 9급 통신이론 5번 풀이 바로가기](/exams/communication/local/2014#q-5)
- [2011년 지방직 9급 통신이론 3번 풀이 바로가기](/exams/communication/local/2011#q-3)
- [2010년 지방직 9급 통신이론 13번 풀이 바로가기](/exams/communication/local/2010#q-13)

### 📌 국가직 9급 무선공학개론
- [2024년 국가직 9급 무선공학개론 12번 풀이 바로가기](/exams/wireless/national/2024#q-12)
- [2023년 국가직 9급 무선공학개론 8번 풀이 바로가기](/exams/wireless/national/2023#q-8)
- [2022년 국가직 9급 무선공학개론 18번 풀이 바로가기](/exams/wireless/national/2022#q-18)
- [2021년 국가직 9급 무선공학개론 4번 풀이 바로가기](/exams/wireless/national/2021#q-4)
- [2020년 국가직 9급 무선공학개론 11번 풀이 바로가기](/exams/wireless/national/2020#q-11)
- [2016년 국가직 9급 무선공학개론 11번 풀이 바로가기](/exams/wireless/national/2016#q-11)
- [2015년 국가직 9급 무선공학개론 10번 풀이 바로가기](/exams/wireless/national/2015#q-10)
- [2008년 국가직 9급 무선공학개론 12번 풀이 바로가기](/exams/wireless/national/2008#q-12)

### 📌 국가직 & 지방직 전자공학개론
- [2024년 지방직 9급 전자공학개론 15번 풀이 바로가기](/exams/electronics/local/2024#q-15)
- [2014년 지방직 9급 전자공학개론 5번 풀이 바로가기](/exams/electronics/local/2014#q-5)
- [2012년 지방직 9급 전자공학개론 19번 풀이 바로가기](/exams/electronics/local/2012#q-19)
- [2011년 지방직 9급 전자공학개론 8번 풀이 바로가기](/exams/electronics/local/2011#q-8)
- [2021년 국가직 9급 전자공학개론 9번 풀이 바로가기](/exams/electronics/national/2021#q-9)
- [2012년 국가직 9급 전자공학개론 1번 풀이 바로가기](/exams/electronics/national/2012#q-1)