'use client'

import {
  CheckCircledIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'
// import { dayjs } from '@saas/dayjs'
import { Loader2 } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
// import { trpc } from '@/lib/trpc/react'
// import { formatSecondsToMinutes } from '@/utils/format-seconds-to-minutes'

// import { MetadataTooltip } from './metadata-tooltip'
// import { WebhooksSkeletonTable } from './webhooks-skeleton-table'

export interface WebhooksProps {
  videoId: string
}

export function Webhooks() {
  // const {
  //   data,
  //   isLoading: isLoadingWebhooks,
  //   isRefetching: isRefetchingWebhooks,
  // } = trpc.getUploadWebhooks.useQuery(
  //   {
  //     videoId,
  //   },
  //   {
  //     refetchInterval: 15 * 1000,
  //     refetchIntervalInBackground: false,
  //     refetchOnWindowFocus: true,
  //   },
  // )

  const data = {
    webhooks: [
      {
        id: '1',
        type: 'video.upload',
        status: 'SUCCESS',
        createdAt: '2024-09-13T12:00:00Z',
        finishedAt: '2024-09-13T12:02:30Z',
        metadata: '{"key": "value", "detail": "Webhook metadata example"}',
      },
      {
        id: '2',
        type: 'video.encode',
        status: 'ERROR',
        createdAt: '2024-09-13T13:00:00Z',
        finishedAt: '2024-09-13T13:01:45Z',
        metadata: '{"error": "Encoding failed", "retryCount": 3}',
      },
      {
        id: '3',
        type: 'video.publish',
        status: 'RUNNING',
        createdAt: '2024-09-13T14:00:00Z',
        finishedAt: null,
        metadata: '{"key": "value", "detail": "Publishing video..."}',
      },
    ],
  }

  const isRefetchingWebhooks = false

  const isLoadingWebhooks = false

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: 300 }}>
                <div className="flex items-center gap-2">
                  <span>Webhook</span>
                  {isRefetchingWebhooks && (
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                  )}
                </div>
              </TableHead>
              <TableHead style={{ width: 140 }}>Status</TableHead>
              <TableHead style={{ width: 120 }}>Executed At</TableHead>
              <TableHead style={{ width: 120 }}>Duration</TableHead>
              <TableHead style={{ width: 240 }}>
                <div className="flex items-center gap-2">
                  <span>Metadata</span>
                  {/* <MetadataTooltip /> */}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          {isLoadingWebhooks ? (
            // <WebhooksSkeletonTable />
            <h1>Hello</h1>
          ) : (
            <TableBody>
              {data?.webhooks && data.webhooks.length ? (
                data.webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">{webhook.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {webhook.status === 'RUNNING' && (
                        <div className="flex items-center gap-2 font-medium text-muted-foreground">
                          <DotsHorizontalIcon className="h-4 w-4" />
                          <span>Running</span>
                        </div>
                      )}

                      {webhook.status === 'SUCCESS' && (
                        <div className="flex items-center gap-2 font-medium text-emerald-500 dark:text-emerald-400">
                          <CheckCircledIcon className="h-4 w-4" />
                          <span>Success</span>
                        </div>
                      )}

                      {webhook.status === 'ERROR' && (
                        <div className="flex items-center gap-2 font-medium text-red-500 dark:text-red-400">
                          <CrossCircledIcon className="h-4 w-4" />
                          <span>Error</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {/* <time
                        title={dayjs(webhook.createdAt)
                          .toDate()
                          .toLocaleString()}
                        className="text-muted-foreground"
                      >
                        {dayjs(webhook.createdAt).fromNow()}
                      </time> */}
                    </TableCell>
                    <TableCell>
                      {/* {webhook.finishedAt ? (
                        formatSecondsToMinutes(
                          dayjs(webhook.finishedAt).diff(
                            webhook.createdAt,
                            'seconds',
                          ),
                        )
                      ) : (
                        <DotsHorizontalIcon className="h-4 w-4 text-muted-foreground" />
                      )} */}
                    </TableCell>
                    <TableCell>
                      <Textarea
                        readOnly
                        className="min-h-[56px] font-mono text-xs"
                        value={webhook.metadata ?? ''}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </>
  )
}
