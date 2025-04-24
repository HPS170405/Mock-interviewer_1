
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart, PieChart, TrendingUp } from "lucide-react";

const ProgressPage = () => {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-interviewer-blue">Your Progress</h1>
        <div className="text-gray-600">Last practice: 2 days ago</div>
      </div>

      {/* Overview Cards */}
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
            <p className="text-xs text-gray-500">Across all sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Areas Covered</CardTitle>
            <BarChart className="h-4 w-4 text-interviewer-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500">Technical & Behavioral</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress Section */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="skills">Skills Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Clarity of Speech</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Body Language</span>
                  <span>70%</span>
                </div>
                <Progress value={70} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Response Structure</span>
                  <span>75%</span>
                </div>
                <Progress value={75} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Competencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Problem Solving</span>
                  <span>80%</span>
                </div>
                <Progress value={80} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>System Design</span>
                  <span>65%</span>
                </div>
                <Progress value={65} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Code Quality</span>
                  <span>90%</span>
                </div>
                <Progress value={90} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressPage;
