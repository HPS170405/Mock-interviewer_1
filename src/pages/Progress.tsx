
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart, PieChart, TrendingUp, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const ProgressPage = () => {
  const navigate = useNavigate();
  const hasNoData = true; // This would normally be determined by your data fetching logic

  // Empty state data for charts
  const emptyPieData = [
    { name: "No Data", value: 1 }
  ];

  const COLORS = ['#e2e8f0']; // Light gray for empty state

  return (
    <div className="container py-8 space-y-8 animate-fade-in">
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

      {/* Empty state message */}
      {hasNoData && (
        <Card className="border-dashed border-2 border-muted bg-muted/20">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Progress Data Yet</h3>
            <p className="text-muted-foreground mb-6">Complete practice sessions to see your progress tracked here.</p>
            <Button onClick={() => navigate('/practice')}>Start Practicing</Button>
          </CardContent>
        </Card>
      )}

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="interviewer-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Activity className="h-4 w-4 text-interviewer-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">+0 from last week</p>
          </CardContent>
        </Card>

        <Card className="interviewer-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-interviewer-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">+0% improvement</p>
          </CardContent>
        </Card>

        <Card className="interviewer-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
            <PieChart className="h-4 w-4 text-interviewer-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="interviewer-card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Areas Covered</CardTitle>
            <BarChart className="h-4 w-4 text-interviewer-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Different topics</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress Tabs */}
      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="skills">Skills Progress</TabsTrigger>
          <TabsTrigger value="history">Practice History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Problem Solving</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground italic">Complete problem-solving questions to see progress</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>System Design</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground italic">Complete system design questions to see progress</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Structures</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground italic">Complete data structure questions to see progress</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soft Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Communication</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground italic">Complete behavioral questions to see progress</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Problem Analysis</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground italic">Complete analysis questions to see progress</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Time Management</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground italic">Complete timed questions to see progress</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill distribution chart */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer 
                config={{
                  empty: { label: "No Data" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={emptyPieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {emptyPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartLegend>
                      <ChartLegendContent />
                    </ChartLegend>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
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
                <div className="flex flex-col items-center justify-center p-6 bg-muted/20 rounded-lg text-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="font-medium">No practice sessions yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Complete practice sessions to see your history here</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/practice')}
                  >
                    Start Practicing
                  </Button>
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
