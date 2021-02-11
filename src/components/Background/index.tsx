import styled from 'styled-components';

const Background = styled.div`
    background-image: url(/assets/bg.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
    min-height: 100vh;
`;

Background.color = styled.div`
    background-color: rgba(27, 221, 53, 0.1);
    min-height: 100vh;
    min-width: 70vw;
`;

export default Background;
