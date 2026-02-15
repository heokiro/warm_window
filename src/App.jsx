import styled, { keyframes } from 'styled-components';
import FeedbackForm from './components/FeedbackForm';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf6f0 0%, #f8e8e0 50%, #e8f5e9 100%);
  position: relative;
  overflow-x: hidden;
`;

// 벚꽃잎 떨어지는 애니메이션
const fall = keyframes`
  0% {
    transform: translateY(-10px) rotate(0deg) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg) translateX(50px);
    opacity: 0.3;
  }
`;

const sway = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(30px);
  }
`;

// 벚꽃잎 컨테이너
const PetalsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Petal = styled.div`
  position: absolute;
  width: ${props => props.size || 10}px;
  height: ${props => props.size * 0.6 || 6}px;
  background: ${props => props.color || '#ffb7c5'};
  border-radius: 50% 0 50% 50%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation:
    ${fall} ${props => props.duration || 10}s linear infinite,
    ${sway} ${props => props.swayDuration || 3}s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
  opacity: ${props => props.opacity || 0.8};
  transform: rotate(${props => props.rotate || 0}deg);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 1.5rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 0rem;
  padding-top: 0rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #5d4e37;
  margin-bottom: 0rem;
  font-weight: 400;
  letter-spacing: 3px;
  text-shadow: 0 0 20px rgba(255, 183, 197, 0.6);
  font-family: 'Italiana', serif;

  @media (max-width: 480px) {
    font-size: 2.7rem;
    letter-spacing: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(93, 78, 55, 0.7);
  letter-spacing: 1px;
`;

const ExhibitionSection = styled.section`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.2rem 1.5rem;
  margin-bottom: 3rem;
  border: 1px solid rgba(139, 195, 74, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: #8bc34a;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Description = styled.div`
  color: #5d4e37;
  line-height: 2;
  font-size: 0.95rem;
  text-align: justify;

  p {
    margin-bottom: 1.2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.8;
  }
`;

const CreditsSection = styled.footer`
  margin-top: 4rem;
  padding: 2rem 1.5rem;
  text-align: center;
  color: rgba(93, 78, 55, 0.8);
  font-size: 0.85rem;
  line-height: 2;
  border-top: 1px solid rgba(139, 195, 74, 0.3);

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 1.5rem 1rem;
    margin-top: 3rem;
  }
`;

const CreditItem = styled.div`
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CreditLabel = styled.span`
  color: rgba(93, 78, 55, 0.9);
  font-weight: 500;
`;

const CreditValue = styled.span`
  color: rgba(93, 78, 55, 0.7);
  margin-left: 0.5rem;
`;

// 벚꽃잎 생성 함수
const generatePetals = (count) => {
  const colors = ['#ffb7c5', '#ffc0cb', '#ffccd5', '#ffe5ec'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * -20,
    left: Math.random() * 100,
    size: Math.random() * 8 + 6,
    duration: Math.random() * 8 + 8,
    swayDuration: Math.random() * 2 + 2,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.5,
    rotate: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
};

function App() {
  const petals = generatePetals(30);

  return (
    <AppContainer>
      <PetalsContainer>
        {petals.map(petal => (
          <Petal
            key={petal.id}
            top={petal.top}
            left={petal.left}
            size={petal.size}
            duration={petal.duration}
            swayDuration={petal.swayDuration}
            delay={petal.delay}
            opacity={petal.opacity}
            rotate={petal.rotate}
            color={petal.color}
          />
        ))}
      </PetalsContainer>

      <ContentWrapper>
        <Header>
          <Title>입춘(立春)</Title>
        </Header>

        <FeedbackForm />

        <ExhibitionSection>
          <Description>
            <p>
              겨울의 시간은 종종, 끝없는 추위가 계속될 것처럼 보입니다.
              그래서 우리는 쉽게 조급해지고, 스스로를 더 단단히 움켜쥐게 됩니다.
            </p>
            <p>
              입춘(立春)은 봄이 완전히 시작된 날이 아니라,
              아직 차가운 공기 속에서도 계절의 방향이 이미 바뀌었음을 알리는 순간입니다.
              당장은 달라진 게 없이 보여도, 시간은 더 이상 겨울에만 머물러 있지 않습니다.
            </p>
            <p>
              전시장 중앙에는 꽉 움켜쥔 손 조각이 놓여 있습니다.
              단단하게 쥔 그 손은 지난 겨울을 어떻게 버텨왔는지 말해줍니다.
            </p>
            <p>
              우리의 온기를 건네는 순간, 화면 속 시간도 서서히 움직이기 시작합니다.
              얼어붙은 눈 아래 숨어 있던 것들이 드러나고, 천천히 봄으로 물들어갑니다.
            </p>
          </Description>
        </ExhibitionSection>

        <CreditsSection>
          <CreditItem>
            <CreditLabel>참여작가</CreditLabel>
            <CreditValue>D.cus(최재호, 허재혁), 이건웅</CreditValue>
          </CreditItem>
          <CreditItem>
            <CreditLabel>포스터</CreditLabel>
            <CreditValue>김윤희</CreditValue>
          </CreditItem>
          <CreditItem>
            <CreditLabel>조형 모델</CreditLabel>
            <CreditValue>오주영</CreditValue>
          </CreditItem>
          <CreditItem>
            <CreditLabel>장소협찬</CreditLabel>
            <CreditValue>갤러리 잔느</CreditValue>
          </CreditItem>
        </CreditsSection>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
