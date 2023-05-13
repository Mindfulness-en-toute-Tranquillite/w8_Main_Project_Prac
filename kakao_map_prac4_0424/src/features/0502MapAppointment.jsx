// queryKey에 캐싱하여 값 불러오기위해 queryClient선언
const queryClient = useQueryClient();
// getQueryData로 캐싱한 값 INPUTVALUESPROP키로 불러오기.
const InputValuesProp = queryClient.getQueryData({queryKey: ['INPUTVALUESPROP']});
<DeparturesWrapper>
{InputValuesProp.filter(value => value !== "").map((value, index) => ( 
    <div key={index} style={{ display: 'flex', alignItems: 'center', zIndex: '1000'}}>
        <div 
        style={{ 
            width: '40px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red',               //String.fromCharCode(65 + index)는 A, B, C, D와 같은 알파벳을 생성. 
            margin: '3px 1px 3px 10px'  //index가 0부터 시작하기 때문에 65를 더하여 A의 아스키 코드 65부터 시작하도록 설정
            }}>                     
            {String.fromCharCode(65 + index)} 
        </div>
    <InputArea       //출발지 받아온 값 Map으로 돌려 그 갯수만큼 input 만들기            
        key={index}  //(""값도 카운트가 되는데 그 경우 filter로 제외하고 map으로 돌리기)                
        value={value} 
        type="text"
        variant="default"
        size="lg"
        readOnly={true}
        style={{
            width: '100%',
            margin: '3px 0 3px 10px',
            padding: '2%',
            border: '1px solid white',
            backgroundColor: `${LightTheme.GRAY_50}`,
            fontFamily: `${'var(--label1-regular)'} Pretendard sans-serif`,
            fontSize: '14px',
            lineHeight: '18px',
            zIndex: '1000'
        }}
        />
    </div>
))}
</DeparturesWrapper>



const DeparturesWrapper = styled.div`
display: flex;
flex-direction: column;
width: 40%;
`