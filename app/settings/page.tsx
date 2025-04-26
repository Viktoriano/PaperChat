import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #22304a;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 12px;
`;

const Text = styled.p`
  font-size: 16px;
  opacity: 0.7;
`;

export default function SettingsPage() {
  return (
    <Wrapper data-testid="settings-page">
      <Title>Settings</Title>
      <Text>Settings page coming soon.</Text>
    </Wrapper>
  );
}
