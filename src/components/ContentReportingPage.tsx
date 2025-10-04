import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function ContentReportingPage() {
  const reports = [
    {
      id: 1,
      content: "Reported post: Spam content promoting external links",
      status: "Under Review",
      votes: 45,
      created: "2h ago"
    },
    {
      id: 2,
      content: "Reported user: Harassment in comments",
      status: "Resolved",
      votes: 89,
      created: "1d ago"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-8 h-8 text-red-400" />
        <h1 className="text-3xl font-bold text-white">Content Reporting</h1>
      </div>

      <Card className="bg-white/5 border-white/10 p-6 mb-6">
        <p className="text-gray-300">
          Community-driven moderation powered by DAO. Report inappropriate content and vote on moderation decisions.
        </p>
      </Card>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="bg-white/5 border-white/10 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <p className="text-white">{report.content}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                  <span>{report.created}</span>
                  <span>•</span>
                  <span>{report.votes} community votes</span>
                </div>
              </div>
              <Badge className={`${
                report.status === 'Under Review'
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                  : 'bg-green-500/20 text-green-300 border-green-500/30'
              }`}>
                {report.status === 'Under Review' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                {report.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
