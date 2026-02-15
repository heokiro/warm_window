import styled from 'styled-components';
import FeedbackForm from './components/FeedbackForm';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow-x: hidden;
`;

// 크리스마스 장식용 별들
const StarsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size || 2}px;
  height: ${props => props.size || 2}px;
  background: #fff;
  border-radius: 50%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: twinkle ${props => props.duration || 3}s infinite;
  opacity: ${props => props.opacity || 0.7};

  @keyframes twinkle {
    0%, 100% { opacity: ${props => props.opacity || 0.7}; }
    50% { opacity: 1; }
  }
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
  color: #fff;
  margin-bottom: 0rem;
  font-weight: 400;
  letter-spacing: 3px;
  text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
  font-family: 'Italiana', serif;
  
  @media (max-width: 480px) {
    font-size: 2.7rem;
    letter-spacing: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
`;

const ExhibitionSection = styled.section`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.2rem 1.5rem;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: #ff6b6b;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Description = styled.div`
  color: rgba(255, 255, 255, 0.9);
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
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  line-height: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
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
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const CreditValue = styled.span`
  color: rgba(255, 255, 255, 0.7);
  margin-left: 0.5rem;
`;

// 별 생성 함수
const generateStars = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.5 + 0.3,
  }));
};

function App() {
  const stars = generateStars(50);

  return (
    <AppContainer>
      <StarsContainer>
        {stars.map(star => (
          <Star
            key={star.id}
            top={star.top}
            left={star.left}
            size={star.size}
            duration={star.duration}
            opacity={star.opacity}
          />
        ))}
      </StarsContainer>
      
      <ContentWrapper>
        <Header>
          <Title>Warm Window</Title>
        </Header>

        <FeedbackForm />

        <ExhibitionSection>
          <Description>
            <p>
              Warm Window는 차가운 겨울길 위에서 잠시 멈춰 선 이들에게 작은 온기를 건네는 설치 작품입니다.
            </p>
            <p>
              겨울의 거리는 차갑고, 우리는 점점 시야를 좁힌 채 목적지만을 향해 빠르게 걸어갑니다.
              하지만 잠시 걸음을 멈추고 주변을 돌아보는 순간, 예상치 못한 작은 선물이 당신을 위해 준비되어 있습니다.
            </p>
            <p>
              불 꺼진 장난감 가게를 떠올리게 하는 어두운 공간 속 크리스마스 오브제들은 관람객의 움직임에 반응해 하나씩 빛을 밝히며, 방치된 공간에 서서히 온기를 채워 넣습니다.
            </p>
            <p>
              당신이 만들어 낸 쇼윈도우 속 따뜻한 크리스마스 장면이, 이 거리를 걷는 사람들의 마음에도 작은 온기와 위로를 전해 주길 바랍니다.
            </p>
          </Description>
        </ExhibitionSection>

        <CreditsSection>
          <CreditItem>
            <CreditLabel>참여작가</CreditLabel>
            <CreditValue>최재호 / 허재혁</CreditValue>
          </CreditItem>
          <CreditItem>
            <CreditLabel>소품 연출 및 디자인</CreditLabel>
            <CreditValue>김윤희</CreditValue>
          </CreditItem>
          <CreditItem>
            <CreditLabel>장소제공</CreditLabel>
            <CreditValue>갤러리 잔느</CreditValue>
          </CreditItem>
          <CreditItem>
            <CreditLabel>현장 설치 및 프로그램 테스트</CreditLabel>
            <CreditValue>오주영</CreditValue>
          </CreditItem>
        </CreditsSection>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
