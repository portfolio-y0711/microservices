// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <>
      [microservices]
      <br />
      1. 아래와 같은 아키텍처로 비동기 메시지 처리 파이프 라인을 구축하였습니다.
      <br/>
      <br/>
      [요청] front 서버 (service-front) - socket 서버(service-realtime) - amqp 서버 (service-queue) - api 서버 (service-api) <br/><br/>[응답] api 서버 (service-api) - amqp 서버 (service-queue) - socket 서버(service-realtime) - front 서버 (service-fron) 
      <br/>
      <br/>
      2. 이로써 자료의 변경을 요하는 command는 socket/amqp를 이용해 non-block async로 처리하고, 저장된 자료의 인출을 요하는 query는 http 요청을 통해 sync-blocking으로 처리하는 cqrs를 구현하였습니다
      <br />
    </>
  )
}
