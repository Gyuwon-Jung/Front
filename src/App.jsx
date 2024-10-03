import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  Link,
} from "react-router-dom";
import Modal from "react-modal";
import { styled } from "styled-components";

Modal.setAppElement("#root");

const TeamPage = () => {
  const { teamId } = useParams();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [additionalInfo, setAdditionalInfo] = React.useState("");
  const [modalType, setModalType] = React.useState("");

  const openModal = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAdditionalInfo("");
  };

  const handleSubmit = async () => {
    const payload = {
      name: `${teamId}조`,
      category: modalType,
      description: additionalInfo,
    };
  
    console.log("서버로 전송되는 데이터:", payload);
  
    try {
      // Vercel API 경로로 요청
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert("성공적으로 전송되었습니다!");
        closeModal();
      } else {
        alert("전송 실패");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <Container>
      <Header>창의 엔트리 {teamId}조</Header>
      <ButtonGroup>
        {["코드 문제", "회로 문제", "아이디어 문제", "도와주세요"].map(
          (type) => (
            <ActionButton key={type} onClick={() => openModal(type)}>
              {type}
            </ActionButton>
          )
        )}
      </ButtonGroup>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Issue Modal"
      >
        <ModalContent>
          <ModalHeader>{modalType}</ModalHeader>
          <InputField
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="부가 설명을 입력하세요."
          />
          <ModalButtonGroup>
            <SubmitButton onClick={handleSubmit}>다음</SubmitButton>
            <CancelButton onClick={closeModal}>취소</CancelButton>
          </ModalButtonGroup>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const HomePage = () => {
  return (
    <Container>
      <Header>창의 엔트리 팀 선택</Header>
      <ButtonGroup>
        {[1, 2, 3, 4, 5].map((teamId) => (
          <Link key={teamId} to={`/team/${teamId}`} style={{ width: "100%" }}>
            <ActionButton>{teamId}조</ActionButton>
          </Link>
        ))}
      </ButtonGroup>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team/:teamId" element={<TeamPage />} />
      </Routes>
    </Router>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #f0f2f5;
  font-family: "Noto Sans KR", sans-serif;
`;

const Header = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  color: #1a73e8;
  text-align: center;
  font-weight: 700;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 100%;
  flex-grow: 1;
  justify-content: center;
  padding: 0 20px;
`;

const ActionButton = styled.button`
  background-color: #1a73e8;
  color: white;
  padding: 20px;
  font-size: 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;

  &:hover {
    background-color: #155db1;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalHeader = styled.h2`
  font-size: 24px;
  color: #1a73e8;
  margin-bottom: 10px;
`;

const InputField = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  height: 120px;
  resize: none;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const SubmitButton = styled(ActionButton)`
  padding: 10px 20px;
  font-size: 18px;
  flex: 1;
`;

const CancelButton = styled(SubmitButton)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "400px",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

export default App;
