"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const friends = [
  { name: 'Arctic Monkeys', img: '/arctic-monkeys.jpg', meta: '3:56' },
  { name: 'Pixar Disney', img: '/pixar-disney-smiling-funny-friendly-youn_KqG8wY6QRy2DfmVqGWGUIQ_FdupHzpQR_mLQLEQ4coi0Q (1).png', meta: '3:56' },
  { name: 'Clone Trooper', img: '/an-action-shot-of-a-phase-one-clone-trooper-from-s-CDkR3sc1SgWvuiKL0hILXw-xhhi9latTA-BHYXwE_Pddg.png', meta: '3:56' },
  { name: 'Pixar Style', img: '/a-3d-render-of-a-pixar-style-smiling-fun_MLeVe_aETfajsOnC40tkmA_sX7zg495TxaBMc_NMpbJzg.png', meta: '3:56' },
];

export default function ContactListPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const router = useRouter();
  const searchRef = useRef(null);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '160px 12px 34px',
      gap: '20px',
      isolation: 'isolate',
      position: 'relative',
      width: '375px',
      height: '812px',
      minHeight: '812px',
      background: '#2C3851',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0px',
        gap: '20px',
        width: '351px',
        height: '244px',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '4px',
          width: '82px',
          height: '16px',
        }}>
          <div style={{
            width: '62px',
            height: '11px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '21px',
            leadingTrim: 'both',
            textEdge: 'cap',
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '-0.5px',
            color: 'rgba(255, 255, 255, 0.8)',
          }}>
            Artist Name
          </div>
          <div style={{
            width: '16px',
            height: '16px',
          }}>
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0%',
              top: '0%',
              bottom: '0%',
              opacity: 0.87,
            }}>
              Vector
            </div>
            <div style={{
              position: 'absolute',
              left: '25%',
              right: '25%',
              top: '35.79%',
              bottom: '33.33%',
              background: '#FFFFFF',
            }}>
              Vector
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '16px',
          width: '351px',
          height: '208px',
        }}>
          {friends.map((f, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',
              width: '351px',
              height: '40px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '12px',
                width: '303px',
                height: '40px',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `url(${f.img})`,
                  borderRadius: '100px',
                }} />
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '10px',
                  width: '251px',
                  height: '29px',
                }}>
                  <div style={{
                    width: '251px',
                    height: '11px',
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '104%',
                    leadingTrim: 'both',
                    textEdge: 'cap',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#FFFFFF',
                  }}>
                    {f.name}
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '4px',
                    width: '251px',
                    height: '8px',
                  }}>
                    <div style={{
                      width: '122px',
                      height: '8px',
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '104%',
                      leadingTrim: 'both',
                      textEdge: 'cap',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'rgba(255, 255, 255, 0.48)',
                    }}>
                      {f.meta}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                gap: '7.14px',
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.12)',
                borderRadius: '100px',
              }}>
                <div style={{
                  margin: '0 auto',
                  width: '20px',
                  height: '20px',
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '0%',
                    right: '0%',
                    top: '0%',
                    bottom: '0%',
                  }}>
                    Vector
                  </div>
                  <div style={{
                    position: 'absolute',
                    left: '8.33%',
                    right: '8.33%',
                    top: '8.33%',
                    bottom: '8.34%',
                    background: '#FFFFFF',
                  }}>
                    Vector
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
