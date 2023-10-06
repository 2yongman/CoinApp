import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import {Helmet} from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 10px;
  &:hover {
    a{
      color: ${(props) => props.theme.accentColor}
    }
  }
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  const {isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins)
  // const [coins,setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async() => {
  //     setCoins(json.slice(0,100));
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Helmet>
        <title>
          코인
        </title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (<Loader>Loading...</Loader>) : (
      <CoinList>
        {data?.slice(0,100).map((coin) => <Coin key={coin.id}>
          <Link to={{
            pathname: `/${coin.id}`,
            state: { name: coin.name },
          }}>
              <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
              {coin.name} &rarr;
          </Link>
        </Coin>)}
      </CoinList>)}
    </Container>
  )
}

export default Coins