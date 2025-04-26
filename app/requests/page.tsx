"use client";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 160px 12px 0 12px;
  gap: 20px;
  isolation: isolate;
  position: relative;
  width: 375px;
  height: 844px;
  min-height: 844px;
  background: #2C3851;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 56px 0 8px 0;
  gap: 8px;
  position: absolute;
  width: 375px;
  height: 144px;
  left: 0;
  top: 0;
  background: rgba(44, 56, 81, 0.16);
  z-index: 2;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 351px;
  height: 40px;
  gap: 8px;
`;

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9.6px;
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.12);
  border-radius: 80px;
  border: none;
  cursor: pointer;
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  gap: 6px;
  width: 249px;
  height: 40px;
  border-radius: 8px;
  background: none;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  &::placeholder {
    color: #B3B3B3;
    opacity: 1;
  }
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.08);
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const ChipsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const Chip = styled.button<{selected?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 16px;
  gap: 8px;
  background: ${({selected}) => selected ? '#fff' : '#313131'};
  color: ${({selected}) => selected ? '#2C3851' : '#fff'};
  border-radius: 16px;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 20px;
  width: 351px;
  z-index: 0;
`;

const SectionTitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: auto;
  height: 16px;
`;

const SectionTitle = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.5px;
  color: rgba(255,255,255,0.8);
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 351px;
`;

const FriendItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 351px;
  height: 40px;
`;

const FriendImg = styled.div<{src: string}>`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background: url(${props => props.src}) center/cover no-repeat;
`;

const FriendTitles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  width: 203px;
  height: 29px;
`;

const FriendName = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 104%;
  color: #fff;
  display: flex;
  align-items: center;
`;

const FriendMeta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 203px;
  height: 8px;
`;

const FriendStatus = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 104%;
  color: rgba(255,255,255,0.48);
  display: flex;
  align-items: center;
`;

const ActionCircle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.12);
  border-radius: 100px;
  border: none;
  margin-left: 8px;
  cursor: pointer;
`;

const Icon = styled.span`
  font-family: 'Material Symbols Outlined';
  font-size: 24px;
  color: #fff;
`;

const REQUESTS = [
  {
    name: "Myles Webb",
    img: "/arctic-monkeys.jpg",
    since: "Since March 12, 2025"
  },
  {
    name: "Josianne Minders",
    img: "/pixar-disney-smiling-funny-friendly-youn_KqG8wY6QRy2DfmVqGWGUIQ_FdupHzpQR_mLQLEQ4coi0Q (1).png",
    since: "Since March 12, 2025"
  },
  {
    name: "Edouard Philips",
    img: "/pixar-disney-smiling-funny-friendly-youn_KNKoMicOTlKcqiRPQZR0Ug_yu89wSQqRVWTcfzI_rsT-Q.png",
    since: "Since March 12, 2025"
  },
  {
    name: "Marc Antoine",
    img: "/an-action-shot-of-a-phase-one-clone-trooper-from-s-CDkR3sc1SgWvuiKL0hILXw-xhhi9latTA-BHYXwE_Pddg.png",
    since: "Since March 12, 2025"
  }
];

export default function RequestsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("Requests");
  return (
    <Wrapper>
      <Header>
        <SearchRow>
          <BackButton><Icon>arrow_back</Icon></BackButton>
          <SearchField>
            <Icon>search</Icon>
            <SearchInput placeholder="Search for a friend" value={search} onChange={e=>setSearch(e.target.value)} />
          </SearchField>
          <IconButton title="Show ID"><span className="material-symbols-outlined">badge</span></IconButton>
          <IconButton title="Show QR"><span className="material-symbols-outlined">qr_code</span></IconButton>
        </SearchRow>
        <ChipsRow>
          <Chip selected={tab==="All"} onClick={()=>setTab("All")}>All</Chip>
          <Chip selected={tab==="Requests"} onClick={()=>setTab("Requests")}>Requests</Chip>
        </ChipsRow>
      </Header>
      <Contents style={{marginTop: 144}}>
        <SectionTitleRow>
          <SectionTitle>Recents</SectionTitle>
        </SectionTitleRow>
        <FriendList>
          {REQUESTS.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).map((f,i)=>(
            <FriendItem key={i}>
              <FriendImg src={f.img} />
              <FriendTitles>
                <FriendName>{f.name}</FriendName>
                <FriendMeta>
                  <FriendStatus>{f.since}</FriendStatus>
                </FriendMeta>
              </FriendTitles>
              <ActionCircle><Icon>check</Icon></ActionCircle>
              <ActionCircle><Icon>close</Icon></ActionCircle>
            </FriendItem>
          ))}
        </FriendList>
      </Contents>
    </Wrapper>
  );
}
