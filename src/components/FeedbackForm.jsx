import { useState } from 'react';
import styled from 'styled-components';
import { ref, push } from 'firebase/database';
import { db } from '../firebase/config';

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: #5d4e37;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
`;

const FormDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(93, 78, 55, 0.9);
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.6;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 150px;
  padding: 1rem;
  border: 2px solid rgba(139, 195, 74, 0.4);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #5d4e37;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(93, 78, 55, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #8bc34a;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px rgba(139, 195, 74, 0.3);
  }
`;

const SubmitButton = styled.button`
  padding: 0.9rem 2rem;
  background: rgba(255, 183, 197, 0.4);
  color: #5d4e37;
  border: 2px solid rgba(255, 183, 197, 0.6);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 183, 197, 0.25);

  &:hover {
    background: rgba(255, 183, 197, 0.6);
    border-color: rgba(255, 183, 197, 0.8);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 183, 197, 0.35);
  }

  &:active {
    background: rgba(255, 183, 197, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(255, 183, 197, 0.2);
    border-color: rgba(255, 183, 197, 0.4);
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-size: 0.95rem;
  margin-top: 1rem;
  background: ${props => props.success
    ? 'rgba(139, 195, 74, 0.2)'
    : 'rgba(244, 67, 54, 0.2)'};
  color: ${props => props.success ? '#558b2f' : '#c62828'};
  border: 1px solid ${props => props.success
    ? 'rgba(139, 195, 74, 0.5)'
    : 'rgba(244, 67, 54, 0.5)'};
`;

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setMessage({ type: 'error', text: '피드백을 입력해주세요.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // 사람이 읽을 수 있는 날짜 형식으로 변환
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;

      const feedbacksRef = ref(db, 'feedbacks');
      await push(feedbacksRef, {
        feedback: feedback.trim(),
        createdAt: formattedDate,
      });

      setFeedback('');
      setMessage({ type: 'success', text: '피드백이 성공적으로 전송되었습니다. 감사합니다!' });

      // 3초 후 메시지 제거
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('피드백 저장 오류:', error);
      setMessage({ type: 'error', text: '피드백 전송에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormDescription>
      감상과 의견을 남겨주세요. <br/>
      다음 전시에 소중히 반영하겠습니다. <br/>
      </FormDescription>
      <StyledForm onSubmit={handleSubmit}>
        <TextArea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="여기에 작성해주세요..."
          disabled={isSubmitting}
        />
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '전송 중...' : '보내기'}
        </SubmitButton>
      </StyledForm>
      {message && (
        <Message success={message.type === 'success'}>
          {message.text}
        </Message>
      )}
    </FormContainer>
  );
}

export default FeedbackForm;
