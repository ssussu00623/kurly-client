import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NextArrow } from './main/PromoBannerSlider';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const [ certifiedList, setCertifiedList] = useState([]);
  const [ footerLinks, setFooterLinks ] = useState([]);
  const [ companySnsInfo, setCompanySnsInfo ] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    axios.get('/data/footer.json')
         .then((res)=>{
          setCertifiedList(res.data["certified_list"]);
          setFooterLinks(res.data["footer_links"]);
          setCompanySnsInfo(res.data["company_sns"]);
         })
         .catch((error)=>console.log(error))
  },[]);

  return (
    <div className='footer_outline'>
      <div className='footer'>
        <div className='footer_top'>
          <div className='footer_top_left'>
            <ul className='footer_left'>
              <li>고객행복센터</li>
              <li>
                <strong>
                  1644-1107
                  <span>월~토요일 오전 7시 - 오후 6시</span>
                </strong>  
              </li>
            </ul>
            <ul className='support_list'>
              <li className='support_info'>
                <button className='support_info_btn thin'>카카오톡 문의</button>
                <div className='detail_info'>
                  월~토요일<span className='footer_line' />
                  오전 7시 - 오후 6시
                  <br/>
                  일/공휴일<span className='footer_line' />
                  오전 7시 - 오후 1시
                </div>
              </li>
              <li className='support_info'>
                <button className='support_info_btn thin'>1:1 문의</button>
                <div className='detail_info'>
                  365일
                  <br/>고객센터 운영시간에 순차적으로 답변드리겠습니다.
                </div>
              </li>
              <li className='support_info'>
                <button className='support_info_btn thin'>대량주문 문의</button>
                <div className='detail_info'>
                  월~금요일
                  <span className='footer_line' />
                  오전 9시 - 오후 6시
                  <br/>점심시간
                  <span className='footer_line' />
                  낮 12시 - 오후 1시
                </div>
              </li>
              <li>비회원 문의 : help@kurlycorp.com</li>
            </ul>
          </div> {/* end of footer_top_left */}
          <div className='footer_top_right'>
            <ul className='footer_links'>
                {footerLinks && footerLinks.map((link,i)=>(
                  <li key={i}>{link.title}</li>
                ))}
            </ul>
            <div className='company_info'>
              <p>
                법인명 (상호) : 주식회사 컬리 
                <span className='footer_line'/>
                사업자등록번호 : 261-81-23567 사업자정보 확인
              </p>
              <p>
                통신판매업 : 제 2018-서울강남-01646 호
              </p>
              <p>
              주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)
              <span className='footer_line'/>
              대표이사 : 김슬아 
              </p>
              <p>
                채용문의 : recruit@kurlycorp.com
              </p>
              <p>
                팩스: 070 - 7500 - 6098  
              </p>
            </div>
            <ul className='sns_info'>
              {companySnsInfo && companySnsInfo.map((sns,i)=>(
                <li key={i}>
                  <a href={sns.link}>
                    <img src={sns.img} alt="img" />
                  </a>
                </li>
              ))}
            </ul>  
          </div> {/* end of footer_top_left */}
        </div> {/* end of footer_top */}

        <div className='footer_middle'>
          {certifiedList && certifiedList.map((item, i)=>(
            <button key={i}>
              <img src={item.path} alt="logoImage" />
              <p>
                {item.desc1}
              <br/>
                {item.desc2}
              <br/>
                {item.desc3}
              </p>
            </button>
          ))}
        </div>  {/* end of footer_middle */}
      </div> {/* end of footer */}

      <div className='footer_bottom'>
        <p>
          컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.
        </p>
        <p>
          마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
        </p>
        <p>
          <span className='main_product_add' onClick={()=>navigate('/goods/new')}>©</span>
          <span>KURLY CORP. ALL RIGHTS RESERVED</span>
        </p>
      </div>  {/* end of footer_bottom */}
    </div>    
  );
}

