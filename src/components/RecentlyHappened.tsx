import clsx from 'clsx'

import {
  ChatBubbleOvalLeftEllipsisIcon,
  UserIcon,
  GiftIcon,
} from '@heroicons/react/20/solid'

const eventTypes = {
  signedUp: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  feedback: { icon: ChatBubbleOvalLeftEllipsisIcon, bgColorClass: 'bg-blue-500' },
  inquiry: { icon: GiftIcon, bgColorClass: 'bg-green-500' },
}

const timeline = [
  {
    type: eventTypes.signedUp,
    who: 'John Doe',
    what: 'signed up to',
    for: 'Kubernetes course',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    type: eventTypes.feedback,
    who: 'John Doe',
    what: 'gave feedback to',
    for: 'Kubernetes course',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    type: eventTypes.inquiry,
    who: 'John Doe (Acme s.r.o)',
    what: 'asked for',
    for: 'Kubernetes course',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    type: eventTypes.feedback,
    who: 'John Doe',
    what: 'gave feedback to',
    for: 'Kubernetes course',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    type: eventTypes.inquiry,
    who: 'John Doe (Acme s.r.o)',
    what: 'asked for',
    for: 'Kubernetes course',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
]

export function RecentlyHappened() {
  return (
    <>
      <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
            Recently
          </h2>
          {/* Activity Feed */}
          <div className="mt-6 flow-root">
            <ul role="list" className="-mb-8">
              {timeline.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <div className="relative pb-8">
                    {itemIdx !== timeline.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={clsx(
                            item.type.bgColorClass,
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                          )}
                        >
                          <item.type.icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            <a href="#" className="font-medium text-gray-900">
                              {item.who}
                            </a>
                            {' '}{item.what}{' '}
                            <a href="#" className="font-medium text-gray-900">
                              {item.for}
                            </a>
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time dateTime={item.datetime}>{item.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
