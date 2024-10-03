// api/proxy.js
export default async function handler(req, res) {
    try {
      const response = await fetch("http://3.38.97.68:8080/", {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body), // 요청 본문을 JSON으로 변환하여 전송
      });
  
      // 응답 상태 코드에 따른 처리
      if (!response.ok) {
        const errorData = await response.json(); // 서버의 에러 응답을 JSON으로 파싱
        console.error("서버 응답 오류:", errorData);
        return res.status(response.status).json(errorData);
      }
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("EC2 서버 요청 에러:", error);
      res.status(500).json({ message: "EC2 서버로 요청 실패" });
    }
  }
  