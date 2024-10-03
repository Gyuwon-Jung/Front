// api/proxy.js
export default async function handler(req, res) {
    try {
      const response = await fetch("http://3.38.97.68:8080/", {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: req.body ? JSON.stringify(req.body) : null,
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("EC2 서버 요청 에러:", error);
      res.status(500).json({ message: "EC2 서버로 요청 실패" });
    }
  }
  