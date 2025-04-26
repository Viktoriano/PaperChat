import UserQRCodePage from '../components/home/UserQRCodePage';
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #2C3851;
  font-family: 'Poppins', sans-serif;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 12px;
`;

const QRContainer = styled.div`
  background: #F5F5F5;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(44,56,81,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 16px;
  opacity: 0.8;
  text-align: center;
`;

import dynamic from "next/dynamic";
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

export default function Page() {
  return (
    <UserQRCodePage>
      <Wrapper data-testid="user-qr-page">
        <Title>Your QR Code</Title>
        <QRContainer>
          <QRCode value={`paperchat.io/demo-user-id`} size={200} bgColor="#fff" fgColor="#2C3851" />
        </QRContainer>
        <Text>Scan to share your PaperChat profile</Text>
      </Wrapper>
    </UserQRCodePage>
  );
}
