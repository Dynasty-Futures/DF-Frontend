import { useQuery } from '@tanstack/react-query';
import { Download, Eye, FileText } from 'lucide-react';
import { apiClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';

interface AwardDocument {
  title: string;
  viewUrl?: string;
  downloadUrl?: string;
}

const fetchAwards = async (): Promise<AwardDocument[]> => {
  const res = await apiClient.get<ApiResponse<AwardDocument[]>>('/v1/awards');
  return res.data;
};

const DashboardAwards = () => {
  const { data: awards, isLoading, isError } = useQuery({
    queryKey: ['awards'],
    queryFn: fetchAwards,
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Awards</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your funded and payout certificates issued by Dynasty Futures.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-muted/40 rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="glass-card rounded-xl p-6 text-center">
          <p className="text-sm text-muted-foreground">Unable to load awards. Please try again later.</p>
        </div>
      )}

      {!isLoading && !isError && awards && awards.length === 0 && (
        <div className="glass-card rounded-xl p-10 flex flex-col items-center gap-3 text-center">
          <FileText size={36} className="text-muted-foreground/50" />
          <p className="text-base font-medium text-foreground">No awards available yet.</p>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your funded and payout certificates will appear here once they are issued.
          </p>
        </div>
      )}

      {!isLoading && !isError && awards && awards.length > 0 && (
        <div className="space-y-3">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground truncate">{award.title}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {award.viewUrl && (
                  <a
                    href={award.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                  >
                    <Eye size={13} />
                    View
                  </a>
                )}
                {award.downloadUrl && (
                  <a
                    href={award.downloadUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Download size={13} />
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardAwards;
