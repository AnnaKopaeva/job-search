import queryString from 'query-string';

export interface JobItemResponse {
  job_id: string;
  job_title: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: string;
  job_posted_at_timestamp: number;
  job_location: string;
  employer_logo: string;
};

interface JobsResponse {
  jobs: JobItemResponse[] | null;
}

interface JobsResponseData {
  data: JobItemResponse[] | null;
}

export interface JobsSearchParams {
  query: string;
  page: number;
  num_pages: number;
}

const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "";

class JobsService {
  private BASE_URL = process.env.NEXT_PUBLIC_JSORT_API_URL;

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(`${this.BASE_URL}${url}`, {
      ...options,
      headers: {
        "X-RapidAPI-Key": apiKey,
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Fetch failed');
    }

    return res.json();
  }

  async getJobs(params: JobsSearchParams): Promise<JobsResponse> {
    const res = await this.request<JobsResponseData>(`/search?${queryString.stringify(params)}`);
    return { jobs: res.data };
  }
  
  async getJobDetails(id: string): Promise<{job: JobItemResponse[]}> {
    if (!id) {
      return { job: []}
    }
    const res = await this.request<{data: JobItemResponse[]}>(`/job-details?job_id=${id}`);
    return { job: res.data };
  }
}

export const jobsService = new JobsService()
