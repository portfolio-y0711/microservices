// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <>
      [testable_clean_code]
      <br />
      1. 데이터베이스 seeder 코드의 기능 추가 및 리팩토링을 수행하였습니다.
      <br />
      <br />
      2. routing table(switch case문을 제거)으로 메소드 단위에서의 OCP를 준수하고자 하였습니다.
      <br />
      <br />
      3. 테스트 케이스 작성의 편의를 도모하기 위해 seeder 기능을 데이터 로딩과 처리로 나누었습니다.
      <br />
      (서버 구동시에는 파일에서 로딩, 테스트 케이스 작성시에는 json 객체 직접 주입이 용이하도록
      변경)
    </>
  )
}
