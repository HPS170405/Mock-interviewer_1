
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart, PieChart, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProgressPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl font-bold text-interviewer-blue">Your Progress</h1>
      </div>

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Activity className="h-4 w-4 text-interviewer-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-interviewer-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-gray-500">+5% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
            <PieChart className="h-4 w-4 text-interviewer-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Areas Covered</CardTitle>
            <BarChart className="h-4 w-4 text-interviewer-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500">Different topics</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress Tabs */}
      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList>
          <TabsTrigger value="skills">Skills Progress</TabsTrigger>
          <TabsTrigger value="history">Practice History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Problem Solving</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>System Design</span>
                  <span>70%</span>
                </div>
                <Progress value={70} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Data Structures</span>
                  <span>75%</span>
                </div>
                <Progress value={75} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soft Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Communication</span>
                  <span>90%</span>
                </div>
                <Progress value={90} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Problem Analysis</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Time Management</span>
                  <span>80%</span>
                </div>
                <Progress value={80} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Practice Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Technical Interview</p>
                    <p className="text-sm text-gray-500">85% success rate</p>
                  </div>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Behavioral Questions</p>
                    <p className="text-sm text-gray-500">90% success rate</p>
                  </div>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">System Design</p>
                    <p className="text-sm text-gray-500">75% success rate</p>
                  </div>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressPage;
