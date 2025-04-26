export declare class AwsS3Service {
    private storageService;
    private bucketName;
    constructor();
    uploadImage(filePath: string, file: any): Promise<string>;
    getFile(filePath: string): Promise<string>;
    deleteImg(filePath: string): Promise<string>;
}
