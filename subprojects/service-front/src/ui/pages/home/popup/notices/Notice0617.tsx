// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <>
      [automated_ci_cd]
      <br />
      1. 서비스 컨테이너화를 위한 Dockerfile 및 docker-compose 설정이 완료되었습니다.
      <br />
      <br />
      2. 로컬 개발 (서비스 컨테이너 구동)에서 API, UI 소스 코드 갱신시 서비스가 Hot Reloading 되도록
      File Monitoring을 설정 완료했습니다.
      <br />
      <br />
      3. 도커라이즈 컨테이너 사용을 통해 배포 서버 동일 환경(Ubuntu 18.04)에서의 빌드가 보장됩니다.
      <br />
      <br />
      컨테이너화 관련 영상은{' '}
      <a href="https://youtu.be/aJFyOdn1duc"> https://youtu.be/aJFyOdn1duc </a>에서 확인할 수
      있습니다.
    </>
  )
}
