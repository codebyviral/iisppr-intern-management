import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

const TweetMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute lg:top-24 lg:left-72 lg:block tweet-card">
      <Card className="lg:w-full lg:max-w-md">
        <CardHeader>
          <CardTitle>Good morning, InternHub user!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Open the panel and watch your progress and growth in knowledge.
          </p>
          <Button
            onClick={() => navigate("/settings")}
            variant="primary"
            className="w-full bg-blue-600 text-white"
          >
            Settings
          </Button>
          {/* fix other */}
        </CardContent>
      </Card>
    </div>
  );
};

export default TweetMessage;
