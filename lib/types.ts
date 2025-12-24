export type CustomerMessageInput = {
  firstname: string;
  lastname: string;
  message: string;
};

export type ExecuteWorkflowRequestBody = {
  input?: CustomerMessageInput;
  dryRun?: boolean;
  jsonPayload?: Record<string, unknown>;

  param1?: string;
  param2?: string;
};

export type ExecuteWorkflowSuccessResponse = {
  success: true;
  data: unknown;
  executedAt: string;
  executionId: string;
  durationMs: number;
};

export type ExecuteWorkflowErrorResponse = {
  success: false;
  error: {
    message: string;
    status?: number;
    code?: string;
  };
  executedAt: string;
  executionId: string;
  durationMs: number;
};

export type ExecuteWorkflowResponse =
  | ExecuteWorkflowSuccessResponse
  | ExecuteWorkflowErrorResponse;

export type WorkflowExecutionRecord = {
  executionId: string;
  executedAt: string;
  durationMs: number;
  params: Record<string, unknown>;
  success: boolean;
  data?: unknown;
  error?: { message: string; status?: number; code?: string };
};
