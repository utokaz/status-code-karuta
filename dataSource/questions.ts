export type Question = {
  questionId: number;
  questionText: string;
  statusCode: string;
  statusName: string;
};

const aboutInformation: Question[] = [
  {
    questionId: 1,
    questionText:
      'これは暫定レスポンスで、その時点までのすべてに問題がなく、クライアントはリクエストを継続してよい、またもしリクエストが完了している場合はレスポンスを無視してよいことを示します。',
    statusCode: '100',
    statusName: 'Continue',
  },
  {
    questionId: 2,
    questionText:
      'このコードはクライアントからの Upgrade リクエストヘッダーのレスポンスとして送信され、サーバーはプロトコルを切り替えていることを示します。',
    statusCode: '101',
    statusName: 'Switching Protocols',
  },
  {
    questionId: 3,
    questionText:
      'このコードは、サーバーはリクエストを受け取って処理しているが、まだレスポンスを提供できないことを示します。',
    statusCode: '102',
    statusName: 'Processing',
  },
  {
    questionId: 4,
    questionText:
      'このステータスコードは主に Link ヘッダーとともに使用され、サーバーがリソースを準備している間、ユーザーエージェントがリソースの先読みを開始できるようにするためのものです。',
    statusCode: '103',
    statusName: 'Early Hints',
  },
];

const aboutSuccess: Question[] = [
  {
    questionId: 5,
    questionText:
      'リクエストが成功したことを示します。成功が意味することは、 HTTP メソッドにより異なります。GET: リソースが読み込まれ、メッセージ本文で転送された。HEAD: メッセージ本文がなく、表現ヘッダーがレスポンスに含まれている。PUT または POST: 操作の結果を表すリソースがメッセージ本文で送信される。TRACE: メッセージ本文に、サーバーが受け取ったリクエストメッセージが含まれている。',
    statusCode: '200',
    statusName: 'OK',
  },
  {
    questionId: 6,
    questionText:
      'リクエストは成功し、その結果新たなリソースが作成されたことを示します。これは一般的に、 POST リクエストや、一部の PUT リクエストを送信した後のレスポンスになります。',
    statusCode: '201',
    statusName: 'Created',
  },
  {
    questionId: 7,
    questionText:
      'リクエストは受理されたが、まだ実行されていないことを示します。 これはあいまいです。 HTTP ではリクエストを処理した結果を示す非同期なレスポンスを後から送信する方法がないためです。 リクエストは別のプロセスかサーバーが処理する、またはバッチ処理する予定です。',
    statusCode: '202',
    statusName: 'Accepted',
  },
  {
    questionId: 8,
    questionText:
      'このレスポンスコードは、返されるメタ情報のセットが生成元のサーバーから得られるセットと同一ではなく、ローカルまたは第三者の持つ複製から収集したことを表します。 これは主に、他のリソースのミラーやバックアップを使用したときに使用されます。 このような場合以外は、このステータスより 200 OK のほうが好ましいレスポンスです。',
    statusCode: '203',
    statusName: 'Non-Authoritative Information',
  },
  {
    questionId: 9,
    questionText:
      'リクエストに対して送信するコンテンツはありませんが、ヘッダーは有用であることを示します。ユーザーエージェントはこのリソースに関するキャッシュ済みのヘッダーを、新たな内容に更新します。',
    statusCode: '204',
    statusName: 'No Content',
  },
  {
    questionId: 10,
    questionText:
      'ユーザーエージェントに対し、リクエストを送信した文書をリセットするよう伝達します。',
    statusCode: '205',
    statusName: 'Reset Content',
  },
  {
    questionId: 11,
    questionText:
      'このレスポンスコードは、クライアントが Range ヘッダーを送信し、リソースの一部だけをリクエストした時に使用されます。',
    statusCode: '206',
    statusName: 'Partial Content',
  },
  {
    questionId: 12,
    questionText:
      '複数のステータスコードがあてはまる状況で、複数のリソースに関する情報を伝えます。',
    statusCode: '207',
    statusName: 'Multi-Status ',
  },
  {
    questionId: 13,
    questionText:
      '同じコレクションに繰り返し複数のバインディングする内部メンバーを列挙することを避けるため、 <dav:propstat> レスポンス要素の内部で使用します。',
    statusCode: '208',
    statusName: 'Already Reported',
  },
  {
    questionId: 14,
    questionText:
      'サーバーはリソースへの GET リクエストの処理を完了しており、レスポンスは現在のインスタンスに適用された 1 つ以上の instance manipulation の結果を表します。',
    statusCode: '226',
    statusName: 'IM Used',
  },
];

const aboutRedirect: Question[] = [
  {
    questionId: 15,
    questionText:
      'リクエストに対して複数のレスポンスがあることを示します。ユーザーエージェントやユーザーは、それらからひとつを選択します。 (複数のレスポンスからひとつを選ぶ方法は標準化されていませんが、選択肢へリンクする HTML が推奨されており、それによってユーザーが選択することができます。)',
    statusCode: '300',
    statusName: 'Multiple Choice',
  },
  {
    questionId: 16,
    questionText:
      'リクエストされたリソースの URL が永遠に変更されたことを示します。レスポンスで新しい URL が与えられます。',
    statusCode: '301',
    statusName: 'Moved Permanently',
  },
  {
    questionId: 17,
    questionText:
      'このレスポンスコードは、リクエストされたリソースの URI が 一時的に 変更されたことを示します。 URI は将来、さらに変更される可能性があります。従って、クライアントは将来のリクエストでも同じ URI を使用するべきです。',
    statusCode: '302',
    statusName: 'Found',
  },
  {
    questionId: 18,
    questionText:
      'サーバーはこのレスポンスを、リクエストされたリソースを別の URI で GET リクエストを使用して取得するようクライアントを誘導するために送信します。',
    statusCode: '303',
    statusName: 'See Other',
  },
  {
    questionId: 19,
    questionText:
      'これはキャッシュ用に使用します。 このレスポンスコードはクライアントに対して、レスポンスは変更されていないことを示します。よって、クライアントはキャッシュ済みのレスポンスを使い続けます。',
    statusCode: '304',
    statusName: 'Not Modified',
  },
  {
    questionId: 20,
    questionText:
      'サーバーはこのレスポンスを、リクエストされたリソースを別の URI で、元のリクエストと同じメソッドを使用して取得するようクライアントを誘導するために送信します。 これは 302 Found HTTP レスポンスコードと同じ意味を持ちますが、ユーザーエージェントは使用する HTTP メソッドを変更してはならない点が異なります。始めのリクエストで POST を用いた場合は、次のリクエストでも POST を使用しなければなりません。',
    statusCode: '307',
    statusName: 'Temporary Redirect',
  },
  {
    questionId: 21,
    questionText:
      'これは、リソースが HTTP の Location: レスポンスヘッダーで指定した別の URI へ永続的に置かれていることを示します。これは 301 Moved Permanently HTTP レスポンスコードと同じ意味を持ちますが、ユーザーエージェントは使用する HTTP メソッドを変更してはならない点が異なります。始めのリクエストで POST を用いた場合は、次のリクエストでも POST を使用しなければなりません。',
    statusCode: '308',
    statusName: 'Permanent Redirect',
  },
];

const aboutClientError: Question[] = [
  {
    questionId: 22,
    questionText:
      '構文が無効であるためサーバーがリクエストを理解できないことを示します。',
    statusCode: '400',
    statusName: 'Bad Request',
  },
  {
    questionId: 23,
    questionText:
      'HTTP 標準ではunauthorized(不許可)と定義されていますが、意味的にはこのレスポンスは unauthenticated(未認証)です。つまり、クライアントはリクエストされたレスポンスを得るためには認証を受けなければなりません。',
    statusCode: '401',
    statusName: 'Unauthorized',
  },
  {
    questionId: 24,
    questionText:
      'このレスポンスコードは、将来のために予約されています。このコードは当初、デジタル決済システムで使用するために作成されましたが、ごく稀にしか使用されておらず、標準的な慣例はありません。',
    statusCode: '402',
    statusName: 'Payment Required',
  },
  {
    questionId: 25,
    questionText:
      '認証されていないなどの理由でクライアントにコンテンツのアクセス権がなく、サーバーが適切なレスポンスの返信を拒否していることを示します。401 Unauthorizedとは異なり、クライアントのIDがサーバーに知られています。',
    statusCode: '403',
    statusName: 'Forbidden',
  },
  {
    questionId: 26,
    questionText:
      'サーバーがリクエストされたリソースを発見できないことを示します。 ブラウザーでは、これは URL が解釈できなかったことを意味します。 API では、これは通信先が有効であるものの、リソース自体が存在しないことを意味することがあります。 サーバーは認証されていないクライアントからリソースの存在を隠すために、 403 の代わりにこのレスポンスを返すことがあります。 このレスポンスコードはウェブで頻繁に見られるため、おそらくもっとも有名なコードでしょう。',
    statusCode: '404',
    statusName: 'Not Found',
  },
  {
    questionId: 27,
    questionText:
      'サーバーがリクエストメソッドを理解しているものの、無効にされており使用することができません。例えば、 API がリソースを DELETE することを禁止できます。 GET および HEAD の 2 つは必須で、無効にすることができず、このエラーコードを返してはいけません。',
    statusCode: '405',
    statusName: 'Method Not Allowed',
  },
  {
    questionId: 28,
    questionText:
      'このレスポンスは、ウェブサーバーが サーバー駆動型コンテンツネゴシエーション (en-US) を行った結果、ユーザーエージェントから与えられた条件に合うコンテンツが見つからない場合に送信されます。',
    statusCode: '406',
    statusName: 'Not Acceptable',
  },
  {
    questionId: 29,
    questionText:
      'このレスポンスはクライアントが以前にリクエストを行っていない、アイドル状態の接続において一部のサーバーが送信します。 サーバーが使用していない接続の終了を望んでいることを示します。 このレスポンスは Chrome、 Firefox 27 以降、IE9 など、閲覧を高速化するための HTTP 事前接続機能を使用する一部のブラウザーでよく使用します。 また、一部のサーバーはこのメッセージを送らずに接続を閉じることに注意してください。',
    statusCode: '408',
    statusName: 'Request Timeout',
  },
  {
    questionId: 30,
    questionText:
      'このレスポンスは、リクエストがサーバーの現在の状態と矛盾する場合に送られるでしょう。',
    statusCode: '409',
    statusName: 'Conflict',
  },
  {
    questionId: 31,
    questionText:
      'このレスポンスは、リクエストされたコンテンツがサーバーから永久に削除され、転送先アドレスがない場合に送られます。 クライアントはこのリソースへのキャッシュやリンクを削除することが期待されます。 HTTP仕様書ではこのコードを「期間限定のプロモーションサービス」に使用することを意図しています。 API はこのステータスコードの場合、削除されたリソースを無理に示そうとするべきではありません。',
    statusCode: '410',
    statusName: 'Gone',
  },
  {
    questionId: 32,
    questionText:
      'サーバーが Content-Length ヘッダーフィールドを要求しているが、リクエストで定義されていないために、サーバーがリクエストを拒否したことを示します。',
    statusCode: '411',
    statusName: 'Length Required',
  },
  {
    questionId: 33,
    questionText:
      'サーバー側で適合しない前提条件が、クライアント側のヘッダーに含まれていることを示します。',
    statusCode: '412',
    statusName: 'Precondition Failed',
  },
  {
    questionId: 34,
    questionText:
      'リクエストの本体がサーバーで定めている上限を超えていることを示します。 サーバーは接続を閉じるか、Retry-After ヘッダーフィールドを返します。',
    statusCode: '413',
    statusName: 'Payload Too Large',
  },
  {
    questionId: 35,
    questionText:
      'クライアントがリクエストした URI が、サーバーで扱える長さを超えていることを示します。',
    statusCode: '414',
    statusName: 'URI Too Long',
  },
  {
    questionId: 36,
    questionText:
      'リクエストされたデータのメディア形式をサーバーが対応しておらず、サーバーはリクエストを拒否したことを示します。',
    statusCode: '415',
    statusName: 'Unsupported Media Type',
  },
  {
    questionId: 37,
    questionText:
      'リクエスト内の Range ヘッダーフィールドで指定された範囲を満たすことができないことを示します。 指定した範囲が、目的の URI のデータサイズを超えている可能性があります。',
    statusCode: '416',
    statusName: 'Range Not Satisfiable',
  },
  {
    questionId: 38,
    questionText:
      'このレスポンスコードは、Expect リクエストヘッダーで指定された内容がサーバー側と適合しないことを示します。',
    statusCode: '417',
    statusName: 'Expectation Failed',
  },
  {
    questionId: 39,
    questionText:
      'サーバーは、ティーポットでコーヒーを淹れようとする試みを拒否します。',
    statusCode: '418',
    statusName: `I'm a teapot`,
  },
  {
    questionId: 40,
    questionText:
      'リクエストは、レスポンスを生成できないサーバーに送られました。 リクエストの URI に含まれているスキームや権限の組み合わせに対してレスポンスを生成するよう設定されていないサーバーが、このコードを送ることがあります。',
    statusCode: '421',
    statusName: 'Misdirected Request',
  },
  {
    questionId: 41,
    questionText:
      'リクエストは適正ですが、意味が誤っているために従うことができません。',
    statusCode: '422',
    statusName: 'Unprocessable Entity',
  },
  {
    questionId: 42,
    questionText: 'アクセス中のリソースはロックされています。',
    statusCode: '423',
    statusName: 'Locked',
  },
  {
    questionId: 43,
    questionText:
      '前のリクエストが失敗したため、このリクエストも失敗しました。',
    statusCode: '424',
    statusName: 'Failed Dependency',
  },
  {
    questionId: 44,
    questionText:
      'サーバーが、繰り返される可能性のあるリクエストを処理するリスクを望まないことを示します。',
    statusCode: '425',
    statusName: 'Too Early',
  },
  {
    questionId: 45,
    questionText:
      'サーバーは現在のプロトコルを使用したリクエストの実行を拒否しましたが、クライアントが別のプロトコルにアップグレードした後は受け入れることができます。 サーバーは必要なプロトコルを示すために、426 のレスポンスで Upgrade ヘッダーフィールドを送信しなければなりません。',
    statusCode: '426',
    statusName: 'Upgrade Required',
  },
  {
    questionId: 46,
    questionText:
      'オリジンサーバーはリクエストが条件付きになることを必要としています。 このレスポンスは「ロストアップデート問題」 (クライアントがリソースの状態を取得して変更およびサーバーに送信している間に、第三者がサーバーの状態を変更して競合が発生すること) を防ごうとするものです。',
    statusCode: '428',
    statusName: 'Precondition Required',
  },
  {
    questionId: 47,
    questionText:
      'ユーザーは一定の時間内に大量のリクエストを送信しました ("レート制限")。',
    statusCode: '429',
    statusName: 'Too Many Requests',
  },
  {
    questionId: 48,
    questionText:
      'ヘッダーフィールドが大きすぎるため、サーバーはリクエストの処理を望みません。 ヘッダーフィールドのサイズを削減した後に、リクエストを再送信できます。',
    statusCode: '431',
    statusName: 'Request Header Fields Too Large',
  },
  {
    questionId: 49,
    questionText:
      'ユーザーエージェントが政府によって検閲されたウェブページなど、違法なリソースをリクエストしています。',
    statusCode: '451',
    statusName: 'Unavailable For Legal Reasons',
  },
];

const aboutServerError: Question[] = [
  {
    questionId: 50,
    questionText:
      'サーバー側で処理方法がわからない事態が発生したことを示します。',
    statusCode: '500',
    statusName: 'Internal Server Error',
  },
  {
    questionId: 51,
    questionText:
      'リクエストメソッドをサーバーが対応しておらず、扱えないことを示します。サーバーが対応しなければならない (従って、このコードを返してはならない) メソッドは GET と HEAD だけです。',
    statusCode: '501',
    statusName: 'Not Implemented',
  },
  {
    questionId: 52,
    questionText:
      'サーバーはリクエストを処理する準備ができていないことを示します。 一般的な原因は、サーバーがメンテナンスや過負荷でダウンしていることです。 このレスポンスとともに問題について説明する、ユーザーにわかりやすいページを送信するべきであることに注意してください。 このレスポンスは一時的な状況について使用するものであり、また可能であれば、サービスが復旧する前に HTTP の Retry-After ヘッダーに予定時刻を含めてください。 また、これら一時的な状況のレスポンスは通常キャッシュされるべきではないことから、ウェブ管理者はこのレスポンスとともに送られるキャッシュ関連のヘッダーに注意しなければなりません。',
    statusCode: '503',
    statusName: 'Service Unavailable',
  },
  {
    questionId: 53,
    questionText:
      'このエラーレスポンスは、ゲートウェイとして動作するサーバーが時間内にレスポンスを得られない場合に送られます。',
    statusCode: '503',
    statusName: 'Gateway Timeout',
  },
  {
    questionId: 54,
    questionText:
      'リクエストで使用した HTTP のバージョンにサーバーが対応していないことを示します。',
    statusCode: '505',
    statusName: 'HTTP Version Not Supported',
  },
  {
    questionId: 55,
    questionText:
      'サーバーに内部構成エラーがあることを示します。選択したバリアントリソースが透過的コンテンツネゴシエーション自体に携わるよう設定されており、ネゴシエーションプロセスが正しく終了しなかったことを示します。',
    statusCode: '506',
    statusName: 'Variant Also Negotiates',
  },
  {
    questionId: 56,
    questionText:
      'サーバーがリクエストを完了させるのに必要な表現を保存することができなかったため、メソッドがリソースに対して実行できなかったことを示します。',
    statusCode: '507',
    statusName: 'Insufficient Storage',
  },
  {
    questionId: 57,
    questionText: 'サーバーは、リクエストの処理中に無限ループを検出しました。',
    statusCode: '508',
    statusName: 'Loop Detected',
  },
  {
    questionId: 58,
    questionText:
      'サーバーがリクエストを処理するために、リクエストをさらに拡張することが必要です。',
    statusCode: '510',
    statusName: 'Not Extended',
  },
  {
    questionId: 59,
    questionText:
      'クライアントがネットワークでアクセスするために認証が必要であることを示します。',
    statusCode: '511',
    statusName: 'Network Authentication Required',
  },
];

export const questionDataSource = [
  ...aboutInformation,
  ...aboutSuccess,
  ...aboutRedirect,
  ...aboutClientError,
  ...aboutServerError,
];
